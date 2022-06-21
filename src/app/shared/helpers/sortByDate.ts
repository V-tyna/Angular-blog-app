export const sortByDate = (arr: Array<any>): Array<any> => {
  //@ts-ignore
  return arr.sort((prev: any, next: any) => new Date(next.date) - new Date(prev.date));
}
