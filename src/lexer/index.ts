import { isAlpha, isInt, isSkippable } from '../utils/';
import { Token, TokenType } from './token';

const Keywords: Record<string, TokenType> = {
  let: TokenType.Let,
  const: TokenType.Const,
};

export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split('');

  while (src.length > 0) {
    if (src[0] === '(') {
      tokens.push(new Token(src.shift(), TokenType.Lparen));
    } else if (src[0] === ')') {
      tokens.push(new Token(src.shift(), TokenType.Rparen));
    } else if (
      src[0] === '+' ||
      src[0] === '-' ||
      src[0] === '*' ||
      src[0] === '/' ||
      src[0] == '%'
    ) {
      tokens.push(new Token(src.shift(), TokenType.BinaryOperator));
    } else if (src[0] === '=') {
      tokens.push(new Token(src.shift(), TokenType.Equals));
    } else if (src[0] === ';') {
      tokens.push(new Token(src.shift(), TokenType.Semicolon));
    } else {
      if (isInt(src[0])) {
        let num = '';
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift();
        }
        tokens.push(new Token(num, TokenType.Number));
      } else if (isAlpha(src[0])) {
        let identifier = '';
        while (src.length > 0 && isAlpha(src[0])) {
          identifier += src.shift();
        }
        const reserved = Keywords[identifier];
        if (typeof reserved === 'number') {
          tokens.push(new Token(identifier, reserved));
        } else {
          tokens.push(new Token(identifier, TokenType.Identifier));
        }
      } else if (isSkippable(src[0])) {
        src.shift();
      } else {
        throw new Error(`Unrecognized character ${src[0]}`);
      }
    }
  }

  tokens.push(new Token('EOF', TokenType.EOF));
  console.log(tokens);
  return tokens;
}
