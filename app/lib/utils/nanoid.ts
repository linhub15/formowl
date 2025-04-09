import { customAlphabet } from "nanoid";

/** @param size default of `10` */
export const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  10,
);
