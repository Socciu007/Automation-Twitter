const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureInboxX(page) {
  let logErrors = [];
  try {
    const buttonMessage = await page.$(
      'a[aria-label="Direct Messages"] a[data-testid="AppTabBar_DirectMessage_Link"]'
    );
    if (!buttonMessage) {
      logErrors.push({
        error: "title error",
        detail: "Can't find button messages to inbox",
      });
      return logErrors;
    }

    await buttonMessage.click();
    await delay(random(1000, 3000));

    const selectMessage = await page.$$("div.r-1iusvr4");
    if (!selectMessage) {
      logErrors.push({
        error: "title error",
        detail: "Can't find button messages to inbox",
      });
      return logErrors;
    }

    await selectMessage.click();
    await delay(random(1000, 3000));

    try {
      await page.type(
        "div.public-DraftStyleDefault-block div.public-DraftStyleDefault-ltr",
        "hi hi"
      );
      await delay(random(1000, 3000));
    } catch (error) {
      logErrors.push({
        error: "title error",
        detail: error.message,
      });
    }
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
}

export default featureInboxX;
