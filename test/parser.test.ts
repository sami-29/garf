import Parser from '../src/parser';

describe('Parser', () => {
  const parser = new Parser();

  test('should parse an empty program', () => {
    const program = parser.produceAST('');
    expect(program).toEqual({
      kind: 'Program',
      body: [],
    });
  });

  test('should parse a simple addition expression', () => {
    const program = parser.produceAST('1 + 2');
    expect(program).toEqual({
      kind: 'Program',
      body: [
        {
          kind: 'BinaryExpression',
          left: {
            kind: 'NumericLiteral',
            value: 1,
          },
          right: {
            kind: 'NumericLiteral',
            value: 2,
          },
          operator: '+',
        },
      ],
    });
  });

  test('should parse a complex expression', () => {
    const program = parser.produceAST('(1 + 2) * 3 - 4 % 5');
    expect(program).toEqual({
      kind: 'Program',
      body: [
        {
          kind: 'BinaryExpression',
          left: {
            kind: 'BinaryExpression',
            left: {
              kind: 'BinaryExpression',
              left: {
                kind: 'NumericLiteral',
                value: 1,
              },
              right: {
                kind: 'NumericLiteral',
                value: 2,
              },
              operator: '+',
            },
            right: {
              kind: 'NumericLiteral',
              value: 3,
            },
            operator: '*',
          },
          right: {
            kind: 'BinaryExpression',
            left: {
              kind: 'NumericLiteral',
              value: 4,
            },
            right: {
              kind: 'NumericLiteral',
              value: 5,
            },
            operator: '%',
          },
          operator: '-',
        },
      ],
    });
  });
});
