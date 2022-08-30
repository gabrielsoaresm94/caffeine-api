import { hash, compare } from 'bcryptjs';

export const createHash = async (payload: string): Promise<string> => {
  return await hash(payload, 8);
};

export const compareHash = async (
  payload: string,
  hashed: string,
): Promise<boolean> => {
  return await compare(payload, hashed);
};
