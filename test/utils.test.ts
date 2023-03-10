import { isAlpha, isInt, isSkippable } from '../src/utils';

describe('isAlpha function', () => {
  test('should return true for alphabetic characters', () => {
    expect(isAlpha('a')).toBe(true);
    expect(isAlpha('z')).toBe(true);
    expect(isAlpha('A')).toBe(true);
    expect(isAlpha('Z')).toBe(true);
  });

  test('should return false for non-alphabetic characters', () => {
    expect(isAlpha('0')).toBe(false);
    expect(isAlpha('%')).toBe(false);
    expect(isAlpha(' ')).toBe(false);
    expect(isAlpha('\n')).toBe(false);
  });
});

describe('isInt function', () => {
  test('should return true for integer values', () => {
    expect(isInt('0')).toBe(true);
    expect(isInt('1')).toBe(true);
    expect(isInt('9')).toBe(true);
    expect(isInt('-1')).toBe(true);
  });

  test('should return false for non-integer values', () => {
    expect(isInt('f')).toBe(false);
    expect(isInt('(')).toBe(false);
    expect(isInt('e')).toBe(false);
    expect(isInt('O')).toBe(false);
  });
});

describe('isSkippable function', () => {
  test('should return true for skippable characters', () => {
    expect(isSkippable(' ')).toBe(true);
    expect(isSkippable('\n')).toBe(true);
    expect(isSkippable('\t')).toBe(true);
    expect(isSkippable('')).toBe(true);
  });

  test('should return false for non-skippable characters', () => {
    expect(isSkippable('a')).toBe(false);
    expect(isSkippable('1')).toBe(false);
    expect(isSkippable('+')).toBe(false);
    expect(isSkippable('(')).toBe(false);
  });
});
