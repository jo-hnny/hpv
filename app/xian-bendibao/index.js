const axios = require("axios");
const cheerio = require("cheerio");
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Shanghai");

const bendibaoUrl = "http://m.xa.bendibao.com/live/94522.shtm";

const SEND_KEY = process.env.SEND_KEY;

async function queryHPVIsUpdate() {
  const rsp = await axios.get(bendibaoUrl);
  const html = rsp.data;

  const $ = cheerio.load(html);

  const upgradeTimeText = $("#news-article > aside > span.public_time").text();

  const upgradeTime = dayjs.tz(upgradeTimeText).unix();

  const currentTime = dayjs.tz().startOf("day").unix();

  console.log("test----->", currentTime, upgradeTime);

  // if (upgradeTime >= currentTime) {
  //   axios.get(
  //     `https://sctapi.ftqq.com/${SEND_KEY}.send?title=HPV&desp=${upgradeTime};${bendibaoUrl}`
  //   );
  // }
}

module.exports = { queryHPVIsUpdate };
