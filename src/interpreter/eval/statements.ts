import { evaluate } from '..';
import { Program, VarDeclaration } from '../../parser/ast';
import Environment from '../environment';
import { RuntimeVal, MakeNull } from '../values';

export function evalProgram(program: Program, env: Environment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MakeNull();

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }
  return lastEvaluated;
}

export function evalVarDeclaration(
  declaration: VarDeclaration,
  env: Environment
): RuntimeVal {
  const value = declaration.value
    ? evaluate(declaration.value, env)
    : MakeNull();
  return env.declare(declaration.identifier, value, declaration.constant);
}
