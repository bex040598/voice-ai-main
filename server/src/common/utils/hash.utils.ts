import bcrypt from "bcryptjs";

export const hashPassword = (value: string): string => bcrypt.hashSync(value, 10);

export const comparePassword = (value: string, hashedValue: string): boolean =>
  bcrypt.compareSync(value, hashedValue);
