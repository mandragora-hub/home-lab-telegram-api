import task from "../tasks";
import { CronJob } from "cron";

async function mainLoop() {
  await task.dailyReportServices();
}

const cron = new CronJob(
  "*/5 * * * * *", // cronTime
  mainLoop, // onTick
  null, // onComplete
  false, // start automatically
  "America/Los_Angeles" // timeZone
);

export default cron;
