export type ValueType = 'null' | 'number' | 'boolean';

export interface RuntimeVal {
  type: ValueType;
}

export interface NullVal extends RuntimeVal {
  type: 'null';
  value: null;
}

export interface NumberVal extends RuntimeVal {
  type: 'number';
  value: number;
}

export interface BooleanVal extends RuntimeVal {
  type: 'boolean';
  value: boolean;
}

export function MakeNumber(n = 0) {
  return { type: 'number', value: n } as NumberVal;
}

export function MakeNull() {
  return { type: 'null', value: null } as NullVal;
}

export function MakeBool(b = true) {
  return { type: 'boolean', value: b } as BooleanVal;
}
