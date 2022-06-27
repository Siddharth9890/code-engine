import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function checkForFileAndPreview(id)  {
    const outPath = path.join(__dirname, `output/${id}.txt`);
    if (fs.existsSync(outPath)) {
        console.log("SUCCESS");
        const result=fs.readFileSync(outPath)
        console.log(result.toString())
    } else {
        console.log("PROCESSING")
        console.log("File Not Found might be in queue for processing please wait");
    }
}

export async function  checkForFile(id) {
    const outPath = path.join(__dirname, `output/${id}.txt`);
    if (fs.existsSync(outPath)) {
        console.log("SUCCESS")
        console.log("Processing is done and you can check the output now using check for secific submission option")
    } else {
        console.log("PROCESSING")
        console.log("File Not Found might be in queue for processing please wait");
    }
}

