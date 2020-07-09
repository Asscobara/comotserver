
export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export function getDate(date: Date) {
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}
