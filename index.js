#!/usr/bin/env node

import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import os from "os";
import { submitCodeToRedis } from "./src/publisher.js";
import { connectRedis } from "./src/setupPublisherAndSubscriber.js";
import { getSubmissionFromRedis } from "./src/subscriber.js";
import { checkForFile, checkForFileAndPreview } from "./src/tracking.js";
import { checkForHistory } from "./src/checkForHistory.js";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    `Welcome ${os.userInfo().username} to Code Compiler \n`
  );
  await sleep();
  await connectRedis();
  await getSubmissionFromRedis();
  rainbowTitle.stop();
}

async function menu() {
  const answer = await inquirer.prompt({
    name: "menu",
    type: "list",
    message: "Select One of the options to get started\n",
    choices: [
      "Submit a code to remote code engine",
      "Check status of submitted code",
      "History of all codes submitted till date",
      "Check for a specific submission",
      "Exit",
    ],
  });
  if (answer.menu === "Submit a code to remote code engine") {
    await submitCodeToRce();
  } else if (answer.menu === "Check status of submitted code") {
    await statusOfSubmittedCode();
  } else if (answer.menu === "History of all codes submitted till date") {
    await historyOfCodes();
  } else if (answer.menu === "Check for a specific submission") {
    await checkForSpecificSubmission();
  } else if (answer.menu === "Exit") {
    process.exit(0);
  }
  console.log("\n");
  menu();
}

async function submitCodeToRce() {
  const { code } = await inquirer.prompt({
    name: "code",
    type: "editor",
    message: "Please write some code in it and save it ",
  });
  if (code.length === 0) {
    console.log("No Code found Please enter some code");
  } else {
    const id = await submitCodeToRedis(code);
    if (id !== -1) {
      console.log(`Successfully submitted tracking id is:-${id}`);
    } else {
      console.log("Something went wrong");
      process.exit(1);
    }
  }
}

async function statusOfSubmittedCode() {
  const { id } = await inquirer.prompt({
    name: "id",
    type: "input",
    message: "Please input tracking id of length 10:- ",
    default: "XXXXXXXXXX",
  });
  if (id.length !== 10 || id === "XXXXXXXXXX") {
    console.log("Invalid Tracking Id");
  } else {
    await checkForFile(id)
  }
}

async function historyOfCodes() {
  await checkForHistory()
}

async function checkForSpecificSubmission() {
  const { id } = await inquirer.prompt({
    name: "id",
    type: "input",
    message: "Please input tracking id of length 10:- ",
    default: "XXXXXXXXXX",
  });
  if (id.length !== 10 || id === "XXXXXXXXXX") {
    console.log("Invalid Tracking Id");
  } else {
    await checkForFileAndPreview(id)
  }
}

const run = async () => {
  console.clear();
  await welcome();
  await menu();
};

run();
