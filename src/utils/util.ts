
export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export function getDate(date: Date) {
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}

export function getDiffInDays(date1: Date, date2: Date) {
  const diffTime = date1.getDate() - date2.getDate();
  return  Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function log(message: string) {
  console.log(message);
}
