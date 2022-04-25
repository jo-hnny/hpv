const axios = require("axios");
const cheerio = require("cheerio");
const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");

const bendibaoUrl = "http://m.xa.bendibao.com/live/94522.shtm";

const SEND_KEY = process.env.SEND_KEY;

async function queryHPVIsUpdate() {
  const rsp = await axios.get(bendibaoUrl);
  const html = rsp.data;

  const $ = cheerio.load(html);

  const upgradeTime = $("#news-article > aside > span.public_time").text();

  console.log(upgradeTime);

  const machineTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  axios.get(
    `https://sctapi.ftqq.com/${SEND_KEY}.send?title=HPV&desp=${upgradeTime};${machineTime}`
  );
}

module.exports = { queryHPVIsUpdate };
