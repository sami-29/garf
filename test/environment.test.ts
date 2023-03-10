import Environment from '../src/interpreter/environment';
import { MakeBool, MakeNull, MakeNumber } from '../src/interpreter/values';

describe('Environment', () => {
  let env: Environment;

  beforeEach(() => {
    env = new Environment();
  });

  describe('declare', () => {
    it('should declare a variable and return its value', () => {
      const val = MakeNumber(10);
      const result = env.declare('x', val, false);
      expect(result).toBe(val);
      expect(env.lookupVar('x')).toBe(val);
    });

    it('should throw an error if variable is already declared', () => {
      const val1 = MakeNumber(10);
      const val2 = MakeBool(false);
      env.declare('x', val1, false);
      expect(() => {
        env.declare('x', val2, false);
      }).toThrow();
    });

    it('should add a constant variable', () => {
      const val = MakeNull();
      env.declare('x', val, true);
      expect(env.lookupVar('x')).toBe(val);
      expect(() => {
        env.assignVar('x', MakeNumber(10));
      }).toThrow();
    });
  });

  describe('assignVar', () => {
    it('should assign a value to a variable', () => {
      const val1 = MakeNumber(10);
      const val2 = MakeBool(false);
      env.declare('x', val1, false);
      const result = env.assignVar('x', val2);
      expect(result).toBe(val2);
      expect(env.lookupVar('x')).toBe(val2);
    });

    it('should throw an error if variable is constant', () => {
      const val = MakeNull();
      env.declare('x', val, true);
      expect(() => {
        env.assignVar('x', MakeBool(true));
      }).toThrow();
    });

    it('should throw an error if variable is not declared', () => {
      expect(() => {
        env.assignVar('x', MakeNull());
      }).toThrow();
    });
  });

  describe('lookupVar', () => {
    it('should return the value of a declared variable', () => {
      const val = MakeBool(false);
      env.declare('x', val, false);
      expect(env.lookupVar('x')).toBe(val);
    });

    it('should throw an error if variable is not declared', () => {
      expect(() => {
        env.lookupVar('x');
      }).toThrow();
    });
  });

  describe('resolve', () => {
    it('should resolve a variable in the current environment', () => {
      const val = MakeBool(false);
      env.declare('x', val, false);
      const result = env.resolve('x');
      expect(result).toBe(env);
    });

    it('should resolve a variable in a parent environment', () => {
      const parent = new Environment();
      const val = MakeNull();
      parent.declare('x', val, false);
      const child = new Environment(parent);
      const result = child.resolve('x');
      expect(result).toBe(parent);
    });

    it('should throw an error if variable is not declared', () => {
      expect(() => {
        env.resolve('x');
      }).toThrow();
    });
  });
});
