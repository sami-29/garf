import {
  Statement,
  Program,
  Expression,
  Identifier,
  NumericLiteral,
  BinaryExpression,
  VarDeclaration,
} from './ast';
import { tokenize } from '../lexer';
import { Token, TokenType } from '../lexer/token';

export default class Parser {
  private tokens: Token[] = [];

  private notEof(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  private at(): Token {
    return this.tokens[0];
  }

  private eat() {
    const prev = this.tokens.shift();
    return prev;
  }

  private expect(type: TokenType, err: string) {
    const prev = this.tokens.shift();
    if (!prev || prev.type != type) {
      console.error('Parser Error\n', err, prev, '- Expecting: ', type);
      process.exit(1);
    }

    return prev;
  }

  public produceAST(sourceCode: string): Program {
    this.tokens = tokenize(sourceCode);
    const program: Program = {
      kind: 'Program',
      body: [],
    };

    while (this.notEof()) {
      program.body.push(this.parseStatement());
    }
    console.log(JSON.stringify(program, null, 2));
    return program;
  }

  private parseStatement(): Statement {
    switch (this.at().type) {
      case TokenType.Let:
        return this.parseVarDeclaration();
      case TokenType.Const:
        return this.parseVarDeclaration();
      default:
        return this.parseExpression();
    }
  }

  private parseVarDeclaration(): Statement {
    const isConstant = this.eat().type === TokenType.Const;
    const identifier = this.expect(
      TokenType.Identifier,
      'Expected Identifier name following a variable declaration'
    ).value;

    if (this.at().type === TokenType.Semicolon) {
      this.eat();
      if (isConstant) {
        throw new Error(
          `must assign value to a constant expression. No value was provided`
        );
      }
      return {
        kind: 'VariableDeclaration',
        identifier: identifier,
        constant: isConstant,
      } as VarDeclaration;
    }

    this.expect(TokenType.Equals, 'Expected equals token following identifier');

    const declaration = {
      kind: 'VariableDeclaration',
      value: this.parseExpression(),
      identifier,
      constant: isConstant,
    } as VarDeclaration;

    this.expect(
      TokenType.Semicolon,
      'Variable declaration must end with a semicolon'
    );

    return declaration;
  }

  private parseExpression(): Expression {
    return this.parseAdditiveExpression();
  }

  private parseAdditiveExpression(): Expression {
    let left = this.parseMultiplicativeExpression();

    while (this.at().value === '+' || this.at().value === '-') {
      const operator = this.eat().value;
      const right = this.parseMultiplicativeExpression();
      left = {
        kind: 'BinaryExpression',
        left,
        right,
        operator,
      } as BinaryExpression;
    }

    return left;
  }

  private parseMultiplicativeExpression(): Expression {
    let left = this.parsePrimaryExpression();

    while (
      this.at().value == '/' ||
      this.at().value == '*' ||
      this.at().value == '%'
    ) {
      const operator = this.eat().value;
      const right = this.parsePrimaryExpression();
      left = {
        kind: 'BinaryExpression',
        left,
        right,
        operator,
      } as BinaryExpression;
    }

    return left;
  }

  private parsePrimaryExpression(): Expression {
    const tk = this.at().type;
    console.log(this.at());
    switch (tk) {
      case TokenType.Identifier:
        return { kind: 'Identifier', symbol: this.eat().value } as Identifier;

      case TokenType.Number:
        return {
          kind: 'NumericLiteral',
          value: parseFloat(this.eat().value),
        } as NumericLiteral;

      case TokenType.Lparen: {
        this.eat();
        const value = this.parseExpression();
        this.expect(
          TokenType.Rparen,
          'Unexpected token found inside parenthesized expression. Expected closing parenthesis.'
        );
        return value;
      }

      default:
        console.error('Invalid token type', this.at());
        process.exit(1);
    }
  }
}
