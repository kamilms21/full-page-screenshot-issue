import playwright from "playwright";

async function takeScreenshot(url, scrollPage = false) {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, {
    timeout: 0,
  });

  // Enable console logs
  page.on("console", async (msg) => {
    const msgArgs = msg.args();
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue());
    }
  });

  // Log height and width 
  await page.evaluate(() => {
    window.addEventListener("resize", function () {
      console.log("Window resize", {
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });
  });

  if (scrollPage) {
    await autoScroll(page);
  }

  await page.screenshot({
    path: `screenshots/${new Date().toString()}.jpg`,
    fullPage: true,
  });

  await browser.close();
}

const pages = [
  "https://stripe.com",
  "https://github.com",
  "https://hukd.com",
  "https://www.tui.co.uk/destinations/bookaccommodation?dp=t&price=pp&tab=overview&multiSelect=true&greatDealDiscount=0&units%5B%5D=951830:HOTEL&fc=n&duration=7&productCode=951830&pkg=1307466982/3/668/7&tra_o=Ae49d184078e4a5ece117bdff6280aeb8&tra_i=Ae49d184078e4a5ece117bdff6280aeb8&brandType=T&bb=AI&rmbb=AI&rmtp=DD01&airports%5B%5D=LGW&noOfAdults=2&noOfChildren=0&rmpc=1%7C2%7C0%7C0%7C0%7C&when=30-10-2024&packageId=951830TZZN002117301600000001730246400000EK1617308512000001730937600000EK2191DD011307466982/3/668/7",
];

await takeScreenshot(pages[0]);
await takeScreenshot(pages[1]);
await takeScreenshot(pages[2]);
await takeScreenshot(pages[3]);
