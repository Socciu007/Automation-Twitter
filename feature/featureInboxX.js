const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// let logErrors = [];
async function featureInboxX(page, logErrors) {
  try {
    await page.goto("https://twitter.com", {
        timeout: 60000,
        waitUntil: "networkidle2",
      });
await delay(random(2000, 5000));
const currentUrl = await page.url();
      if (!currentUrl.includes("twitter.com/home")) {
        logErrors.push({
          error: "title error",
          detail: "You need to log in X",
        });
        return;
      }
await delay(random(2000, 5000));
    const buttonMessage_0 = await page.$('a[aria-label="Direct Messages"]');
    const buttonMessage_1 = await page.$(
      'a[data-testid="AppTabBar_DirectMessage_Link"]'
    );
    if (buttonMessage_0) {
      await buttonMessage_0.click();
      await delay(random(2000, 5000));
    } else if (buttonMessage_1) {
      await buttonMessage_1.click();
      await delay(random(2000, 5000));
    } else {
      logErrors.push({
        error: "title error",
        detail: "Can't find button inbox",
      });
      return;
    }

    const selectMessage_0 = await page.$$("div.r-1iusvr4");
    if (selectMessage_0.length === 0) {
      logErrors.push({
        error: "title error",
        detail: "Can't find people to inbox",
      });
      return;
    }

    const data = [
      { id: 1, comment: "Very good" },
      { id: 2, comment: "good good good" },
      { id: 3, comment: "so surprised" },
      { id: 4, comment: "too cute" },
      { id: 5, comment: "That's so great" },
      { id: 6, comment: "it's awful" },
      { id: 7, comment: "so beautiful" },
      { id: 8, comment: "so wonderful" },
    ];

    let numberPerson = 0;
    while (numberPerson < random(1, 3)) {
      const indexRandom = random(0, selectMessage_0.length - 1);
      await selectMessage_0[indexRandom].click();
      await delay(random(2000, 5000));

      let numberInbox = 0;
      while (numberInbox < random(1, 3)) {
        try {
          const inbox = data[Math.floor(Math.random() * data.length)];
          const inputMessage_0 = await page.$(
            "div.public-DraftStyleDefault-block"
          );
          const inputMessage_1 = await page.$(
            "div.public-DraftStyleDefault-ltr"
          );
    
          await delay(random(4000, 7000));
          if (inputMessage_0) {
            await inputMessage_0.click();
            await delay(random(4000, 7000));
            await page.type(
              "div.public-DraftStyleDefault-block",
              inbox.comment
            );
            await delay(random(4000, 7000));
            await page.click('div[data-testid="dmComposerSendButton"]');
            await delay(random(2000, 5000));
          } else if (inputMessage_1) {
            await inputMessage_1.click();
            await delay(random(4000, 7000));
            await page.type(
              "div.div.public-DraftStyleDefault-ltr",
              inbox.comment
            );
            await delay(random(4000, 7000));
            await page.click('div[data-testid="dmComposerSendButton"]');
            await delay(random(2000, 5000));
          }
        } catch (error) {
          logErrors.push({
            error: "title error",
            detail: error.message,
          });
          return;
        }
        numberInbox++;
      }
      numberPerson++;
    }

    await delay(random(2000, 5000));
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
}

export default featureInboxX;
