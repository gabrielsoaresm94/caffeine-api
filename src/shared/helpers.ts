import { hash, compare } from 'bcryptjs';

export const createHash = (payload: string): Promise<string> => {
  return hash(payload, 8);
};

export const compareHash = (
  payload: string,
  hashed: string,
): Promise<boolean> => {
  return compare(payload, hashed);
};
