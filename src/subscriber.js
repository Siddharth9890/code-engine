import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { subscriber } from "./setupPublisherAndSubscriber.js";
import { executeJavascript } from "./executeCode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, "codes");
const outPutPath = path.join(__dirname, "output");

if (!fs.existsSync(outPutPath)) fs.mkdirSync(outPutPath, { recursive: true });
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

export async function getSubmissionFromRedis() {
  try {
    await subscriber.subscribe("codes", (message) => {
      generateFile(JSON.parse(message));
    });
  } catch (error) {
    console.log("Something went wrong");
  }
}

export async function generateFile(submission) {
  try {
    let fileToBeCreated = `${submission.id}.js`;
    const filePath = path.join(dirPath, fileToBeCreated);

    fs.writeFile(filePath, submission.code, (error) => { if (error) throw error });
    const result = await executeJavascript(filePath);

    fileToBeCreated = `${submission.id}.txt`;
    const filePathOut = path.join(outPutPath, fileToBeCreated);

    fs.writeFile(filePathOut, result, (error) => { if (error) throw error });
  } catch (error) {
    let fileToBeCreated = `${submission.id}.txt`;

    const filePathOut = path.join(outPutPath, fileToBeCreated);
    fs.writeFile(filePathOut, error.error.toString(), (error) => { if (error) throw error });
  }
}
