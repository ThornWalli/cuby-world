export function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}

export function easeInQuart(x: number): number {
  return x * x * x * x;
}

export function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

export function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
