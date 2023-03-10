export enum TokenType {
  Number,
  string,
  Identifier,
  Equals,
  Semicolon,
  Lparen,
  Rparen,
  BinaryOperator,
  EOF,
  Let,
  Const,
}

export class Token {
  value: string;
  type: TokenType;

  constructor(value: string, type: TokenType) {
    this.value = value;
    this.type = type;
  }

  toString(): string {
    return `${this.value} ${this.type}`;
  }
}
