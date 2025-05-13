const crypto = require("crypto");

function generateRandomKey(length = 10) {
  return crypto.randomBytes(length).toString("hex");
}

const key = generateRandomKey();
console.log("Generated key:", key);
