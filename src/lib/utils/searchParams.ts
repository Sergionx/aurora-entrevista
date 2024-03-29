export function getNumberFromString(value: string) {
  const number = Number(value);

  if (number < 1 || Number.isNaN(number)) return 1;

  return number;
}
