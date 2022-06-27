import { Comment, Post } from '../interfaces';

export const sortByDate = <T extends Post | Comment>(arr: T[]): T[] => {
  return arr.sort((prev: T, next: T) => +new Date(next.date) - +new Date(prev.date));
};
