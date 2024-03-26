export function getNumberFromString(value: string) {
  try {
    const number = Number(value);

    if (number < 1) return 1;

    return number;
  } catch (error) {
    return 1;
  }
}
