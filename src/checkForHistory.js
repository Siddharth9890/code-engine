import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outPath = path.join(__dirname, "output");

export async function checkForHistory() {
    try {
        const files = fs.readdirSync(outPath)
        files.forEach(file => { console.log(file) })
    } catch (error) {
        console.log("Something went wrong");
    }

}