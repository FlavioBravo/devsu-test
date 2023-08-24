export function getOneYearOlder(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYYYYMMDDFormat(date: string): string {
  const position = date.indexOf('T');
  const correctDate = date.slice(0, position);
  return correctDate;
}
