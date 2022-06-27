import { exec } from "child_process";
import { kill } from "process";


export async function executeJavascript(filePath) {
  return new Promise((resolve, reject) => {
    const execProcess = exec(`node ${filePath}`, (error, stdout, stderr) => {
      if (error) reject({ error });
      if (stderr) reject({ stderr });
      resolve(stdout);
    });
    setTimeout(() => {
      try {
        kill(execProcess.pid);
        reject(
          "SYSTEM AUTOMATICALLY TERMINATES PROCESS RUNNING LONGER THAN 10 SECONDS "
        );
      } catch (error) {
        reject(
          "SYSTEM AUTOMATICALLY TERMINATES PROCESS RUNNING LONGER THAN 10 SECONDS "
        );
      }
    }, 10000);

  });
};
