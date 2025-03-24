import { customAlphabet } from "nanoid";

export function generateNumericId(defaultSize?: number): string {
  const digits = "0123456789abcdef";
  const nanoid = customAlphabet(digits, defaultSize ?? 19); // 19 is the length of the ID
  return nanoid();
}
