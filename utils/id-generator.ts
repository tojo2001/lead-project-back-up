import { customAlphabet } from "nanoid";

export function generateNumericId(defaultSize?: number): string {
  const digits = "0123456789";
  const nanoid = customAlphabet(digits, defaultSize ?? 7); // 13 is the length of the ID
  return nanoid();
}
