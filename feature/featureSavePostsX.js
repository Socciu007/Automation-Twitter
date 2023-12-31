const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureSavePostsX(
  page,
  durationInMinutes,
  numberStart,
  numberFinish,
  logErrors
) {
  try {
    const durationInMilliseconds = durationInMinutes * 60 * 1000;
    const saveAverageTime =
      durationInMilliseconds / (numberFinish - numberStart);
    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();

    while (currentTime - startTime < durationInMilliseconds) {
      while (currentTime - startTime < (5 / 100) * durationInMilliseconds) {
        await page.mouse.wheel({ deltaY: random(500, 1000) });
        await delay(random(1000, 3000));
        currentTime = new Date().getTime();
      }
      while (numberStart < numberFinish) {
        const buttonSave = await page.$$('div[data-testid="bookmark"]');
        await delay(random(1000, 3000));
        if (buttonSave.length === 0) {
          logErrors.push({
            error: "title error",
            detail: "Can't find button save",
          });
          return;
        }

        const index = random(0, buttonSave.length - 1);
        const positionSave = await buttonSave[index].boundingBox();
        await delay(random(1000, 3000));
        if (!positionSave) {
          logErrors.push({
            error: "title error",
            detail: "Can't find position save",
          });
          return;
        }

        let totalHeight = 0;
        while (totalHeight < positionSave.y) {
          await page.mouse.wheel({ deltaY: random(500, 1000) });
          await delay(random(1000, 3000));
          totalHeight += random(500, 1000);
        }

        if (buttonSave[index]) {
          await buttonSave[index].click();
          await delay(random(1000, 3000));
        } else {
          logErrors.push({
            error: "title error",
            detail: "Can't click save",
          });
          return;
        }

        const saveCurrentTime = new Date().getTime();
        let scrollTime = new Date().getTime();
        const waitSaveTime = random(
          (1 / 3) * saveAverageTime,
          (2 / 3) * saveAverageTime
        );
        while (scrollTime - saveCurrentTime < waitSaveTime) {
          await page.mouse.wheel({ deltaY: random(500, 1000) });
          await delay(random(1000, 3000));
          scrollTime = new Date().getTime();
        }
        await delay(random(1000, 3000));

        numberStart++;
      }
      await page.mouse.wheel({ deltaY: random(500, 1000) });
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

export default featureSavePostsX;
