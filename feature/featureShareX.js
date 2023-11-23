const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureShareX(
  page,
  durationInMinutes,
  numberStart,
  numberFinish
) {
  let logErrors = [];
  try {
    const durationInMilliseconds = durationInMinutes * 60 * 1000;
    const shareAverageTime =
      durationInMilliseconds / (numberFinish - numberStart);

    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    while (currentTime - startTime <= durationInMilliseconds) {
      let breakTime = (5 / 100) * durationInMilliseconds;
      while (currentTime - startTime < breakTime) {
        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));
        currentTime = new Date().getTime();
      }
      while (numberStart < numberFinish) {
        const repostElements = await page.$$('div[data-testid="retweet"]');

        if (repostElements.length === 0) {
          logErrors.push({
            error: "title error",
            detail: "Can't find button share",
          });
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
        const replyRandom = data[Math.floor(Math.random() * data.length)];

        const indexRandom = Math.floor(Math.random() * repostElements.length);

        try {
          await repostElements[indexRandom].click();
          await delay(random(1000, 3000));

          await page.click('a[href="/compose/tweet"]');
          await delay(random(1000, 3000));

          await page.type('div[data-contents="true"]', replyRandom.comment);
          await delay(random(1000, 3000));

          await page.click('div[data-testid="tweetButton"]');
          await delay(random(1000, 3000));
        } catch (error) {
          logErrors.push({
            error: "title error",
            detail: error.message,
          });
        }

        const shareCurrentTime = new Date().getTime();
        let scrollTime = new Date().getTime();
        const waitTime = random(
          (1 / 3) * shareAverageTime,
          (2 / 3) * shareAverageTime
        );
        try {
          await page.mouse.wheel({ deltaY: random(300, 1000) });
          await delay(random(1000, 3000));

          while (scrollTime - shareCurrentTime < waitTime) {
            await page.mouse.wheel({ deltaY: random(300, 1000) });
            await delay(random(1000, 3000));
            scrollTime = new Date().getTime();
          }
        } catch (error) {
          logErrors.push({
            error: "title error",
            detail: error.message,
          });
        }

        numberStart++;
      }
      await page.mouse.wheel({ deltaY: random(300, 1000) });
      await delay(random(1000, 3000));

      currentTime = new Date().getTime();
    }
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
}

export default featureShareX;
