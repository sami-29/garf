import { tokenize } from '../src/lexer';
import { Token, TokenType } from '../src/lexer/token';

describe('tokenize', () => {
  it('returns an empty array for an empty input', () => {
    expect(tokenize('')).toEqual([new Token('EOF', TokenType.EOF)]);
  });

  it('tokenizes parentheses', () => {
    expect(tokenize('()')).toEqual([
      new Token('(', TokenType.Lparen),
      new Token(')', TokenType.Rparen),
      new Token('EOF', TokenType.EOF),
    ]);
  });

  it('tokenizes binary operators', () => {
    expect(tokenize('+-*/')).toEqual([
      new Token('+', TokenType.BinaryOperator),
      new Token('-', TokenType.BinaryOperator),
      new Token('*', TokenType.BinaryOperator),
      new Token('/', TokenType.BinaryOperator),
      new Token('EOF', TokenType.EOF),
    ]);
  });

  it('tokenizes equals sign', () => {
    expect(tokenize('=')).toEqual([
      new Token('=', TokenType.Equals),
      new Token('EOF', TokenType.EOF),
    ]);
  });

  it('tokenizes numbers', () => {
    expect(tokenize('123')).toEqual([
      new Token('123', TokenType.Number),
      new Token('EOF', TokenType.EOF),
    ]);
  });

  it('tokenizes identifiers', () => {
    expect(tokenize('foo bar123')).toEqual([
      new Token('foo', TokenType.Identifier),
      new Token('bar123', TokenType.Identifier),
      new Token('EOF', TokenType.EOF),
    ]);
  });

  it('tokenizes reserved keywords', () => {
    expect(tokenize('let')).toEqual([
      new Token('let', TokenType.Let),
      new Token('EOF', TokenType.EOF),
    ]);
  });

  it('ignores whitespace', () => {
    expect(tokenize(' \n\t')).toEqual([new Token('EOF', TokenType.EOF)]);
  });

  it('throws an error for unrecognized characters', () => {
    expect(() => tokenize('^')).toThrow('Unrecognized character ^');
  });
});
