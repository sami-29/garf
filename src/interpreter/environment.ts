import { RuntimeVal } from './values';

export default class Environment {
  private parent?: Environment;
  private variables: Map<string, RuntimeVal>;
  private constants: Set<string>;

  constructor(parent?: Environment) {
    this.parent = parent;
    this.variables = new Map();
    this.constants = new Set();
  }

  public declare(
    varname: string,
    value: RuntimeVal,
    isConstant: boolean
  ): RuntimeVal {
    if (this.variables.has(varname)) {
      throw `Can not declare ${varname} As it is already defined`;
    }

    console.log(value);
    this.variables.set(varname, value);
    if (isConstant) this.constants.add(varname);
    return value;
  }

  public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
    const env = this.resolve(varname);
    if (env.constants.has(varname)) {
      throw new Error(
        `Cannot reassign to variable ${varname} as it was declared constant`
      );
    }
    env.variables.set(varname, value);
    return value;
  }

  public lookupVar(varname: string): RuntimeVal {
    const env = this.resolve(varname);
    return env.variables.get(varname);
  }

  public resolve(varname: string): Environment {
    if (this.variables.has(varname)) {
      return this;
    }
    if (this.parent === undefined) {
      throw `Cannot resolve ${varname}`;
    }

    return this.parent.resolve(varname);
  }
}
