import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

const handler: Handler = async (
  event: HandlerEvent,
  _context: HandlerContext
) => {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    if (!event.body) {
      return { statusCode: 400, body: "Invalid request" };
    }
    const { url } = JSON.parse(event.body);
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.title();
    await browser.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ title }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

export { handler };
