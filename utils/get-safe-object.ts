// ? Convert objects with RegExp into Mongo-safe JSON
export function safeStringify(obj: any) {
  return JSON.stringify(
    obj,
    (key, value) => {
      // convert regex to { "$regex": pattern, "$options": "i" }
      if (value instanceof RegExp) {
        return { $regex: value.source, $options: value.flags };
      }
      return value;
    },
    2
  );
}

// ? Restore RegExp objects from Mongo-safe JSON
export function safeParse(json: string) {
  return JSON.parse(json, (key, value) => {
    if (
      value &&
      typeof value === "object" &&
      "$regex" in value &&
      typeof value.$regex === "string"
    ) {
      try {
        return new RegExp(value.$regex, value.$options || "");
      } catch {
        return value; // fallback if invalid regex
      }
    }
    return value;
  });
}
