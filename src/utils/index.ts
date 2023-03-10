export function isAlpha(src: string): boolean {
  return /^[a-zA-Z]+$/.test(src);
}

export function isInt(src: string): boolean {
  return Number.isInteger(parseInt(src));
}

export function isSkippable(src: string): boolean {
  return src === '' || src === '\n' || src === '\t' || src === ' ';
}
