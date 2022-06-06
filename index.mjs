import Puppeteer from "puppeteer";
import readline from "readline";

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursiveReadline = async () => {
  const searchQuestion = async (question) => {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://estudaporaqui.com.br/questoes-diversas/`);
    await page.type("#search", question);
    await page.click(".btn.btn-link.text-info");
    await page.waitForSelector(".card.text-center a");
    await page.click(".card.text-center a");
    await page.waitForSelector("#resolution");
    const resolution = await page.$eval(
      "#resolution b",
      (el) => el.textContent
    );
    await browser.close();
    return resolution;
  };

  readLineInterface.question("Tell me your problems: ", async (question) => {
    if (question === "exit") {
      readLineInterface.close();
    }
    console.log("Looking for a solution dude");
    const answer = await searchQuestion(question);
    console.log("Here is your answer: " + answer);
    await recursiveReadline();
  });

  readLineInterface.on("close", async () => {
    console.log("Bye bye");
    process.exit(0);
  });
};
recursiveReadline();
