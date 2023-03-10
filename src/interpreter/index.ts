import { RuntimeVal, NumberVal } from './values';
import {
  BinaryExpression,
  Identifier,
  NumericLiteral,
  Program,
  Statement,
  VarDeclaration,
} from '../parser/ast';
import Environment from './environment';
import { evalBinaryExpression, evalIdentifier } from './eval/expressions';
import { evalProgram, evalVarDeclaration } from './eval/statements';

export function evaluate(astNode: Statement, env: Environment): RuntimeVal {
  switch (astNode.kind) {
    case 'NumericLiteral':
      return {
        value: (astNode as NumericLiteral).value,
        type: 'number',
      } as NumberVal;

    case 'BinaryExpression':
      return evalBinaryExpression(astNode as BinaryExpression, env);
    case 'Program':
      return evalProgram(astNode as Program, env);
    case 'Identifier':
      return evalIdentifier(astNode as Identifier, env);

    case 'VariableDeclaration':
      return evalVarDeclaration(astNode as VarDeclaration, env);
    default:
      console.error('This ast node has not yet been checked');
  }
}
