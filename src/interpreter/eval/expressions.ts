import { evaluate } from '..';
import { BinaryExpression, Identifier } from '../../parser/ast';
import Environment from '../environment';
import { RuntimeVal, NumberVal, MakeNull } from '../values';

export function evalBinaryExpression(
  expression: BinaryExpression,
  env: Environment
): RuntimeVal {
  const left = evaluate(expression.left, env);
  const right = evaluate(expression.right, env);

  if (left.type === 'number' && right.type === 'number') {
    return evaluateNumericBinary(
      left as NumberVal,
      right as NumberVal,
      expression.operator
    );
  }

  return MakeNull();
}

export function evaluateNumericBinary(
  left: NumberVal,
  right: NumberVal,
  operator: string
): NumberVal {
  let result: number;
  switch (operator) {
    case '+':
      result = left.value + right.value;
      break;
    case '-':
      result = left.value - right.value;
      break;
    case '*':
      result = left.value * right.value;
      break;
    case '/':
      result = left.value / right.value;
      break;
    case '%':
      result = left.value % right.value;
      break;
  }
  return { value: result, type: 'number' };
}

export function evalIdentifier(
  identifier: Identifier,
  env: Environment
): RuntimeVal {
  const val = env.lookupVar(identifier.symbol);
  return val;
}
