const fs = require("fs");

const textIn = fs.readFileSync("./input.txt", "utf-8");

const textOut = `Lorem Ipsum: ${textIn}.\n Created on ${Date.now()}`;

fs.writeFileSync("./input.txt", textOut);

console.log("file written");
