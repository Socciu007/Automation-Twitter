const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureInboxX(page) {
  let logErrors = [];
  try {
    const buttonMessage_0 = await page.$('a[aria-label="Direct Messages"]');
    const buttonMessage_1 = await page.$(
      'a[data-testid="AppTabBar_DirectMessage_Link"]'
    );
    if (buttonMessage_0) {
      await buttonMessage_0.click();
      await delay(random(1000, 3000));
    } else if (buttonMessage_1) {
      await buttonMessage_1.click();
      await delay(random(1000, 3000));
    } else {
      logErrors.push({
        error: "title error",
        detail: "Can't find button inbox",
      });
      return;
    }

    const selectMessage_0 = await page.$$("div.r-1iusvr4");
    // const selectMessage_1 = await page.$$("div.r-yca7ao");
    // const selectMessage_2 = await page.$$('span[data-testid="tweetText"]');

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
      await delay(random(1000, 3000));

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
          await delay(random(1000, 3000));
          if (inputMessage_0) {
            await inputMessage_0.click();
            await delay(random(1000, 3000));
            await page.type(
              "div.public-DraftStyleDefault-block",
              inbox.comment
            );
            await delay(random(1000, 3000));
            await page.click('div[data-testid="dmComposerSendButton"]');
            await delay(random(1000, 3000));
          } else if (inputMessage_1) {
            await inputMessage_1.click();
            await delay(random(1000, 3000));
            await page.type(
              "div.div.public-DraftStyleDefault-ltr",
              inbox.comment
            );
            await delay(random(1000, 3000));
            await page.click('div[data-testid="dmComposerSendButton"]');
            await delay(random(1000, 3000));
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

    await delay(random(1000, 3000));
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
  return logErrors;
}

export default featureInboxX;