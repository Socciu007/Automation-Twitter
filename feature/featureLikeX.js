const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
async function featureLikeX(
  page,
  durationInMinutes,
  numberStart,
  numberFinish
) {
  let logErrors = [];
  try {
    const durationInMilliseconds = durationInMinutes * 60 * 1000;
    const startTime = new Date().getTime();
    const likeAverageTime =
      durationInMilliseconds / (numberFinish - numberStart);
    let currentTime = new Date().getTime();

    while (currentTime - startTime < durationInMilliseconds) {
      let likeStartTime = (5 / 100) * durationInMilliseconds;
      while (currentTime - startTime < likeStartTime) {
        await page.mouse.wheel({ deltaY: random(500, 1000) });
        await delay(random(1000, 3000));
        currentTime = new Date().getTime();
      }

      while (numberStart < numberFinish) {
        const likeElements = await page.$$('div[data-testid="like"]');
        await delay(random(1000, 3000));

        if (likeElements.length === 0) {
          logErrors.push({
            error: "title error",
            detail: "Can't find button like",
          });
          return;
        }

        const indexRandom = Math.floor(Math.random() * likeElements.length);
        const positionLike = await likeElements[indexRandom].boundingBox();
        await delay(random(1000, 3000));
        if (!positionLike) {
          logErrors.push({
            error: "title error",
            detail: "Can't find position like",
          });
          return;
        }

        const scrollToLike = async (totalHeight) => {
          if (totalHeight < positionLike.y) {
            await page.mouse.wheel({ deltaY: random(500, 1000) });
            await delay(random(1000, 3000));
            return await scrollToLike(totalHeight + random(500, 1000));
          }

          if (likeElements[indexRandom]) {
            await likeElements[indexRandom].click();
            await delay(random(1000, 3000));
            return;
          } else {
            logErrors.push({
              error: "title error",
              detail: "Can't click like",
            });
            return;
          }
        };

        await scrollToLike(random(0, 100));
        const likeCurrentTime = new Date().getTime();
        let scrollTime = new Date().getTime();
        const waitTimeLike = random(
          (1 / 3) * likeAverageTime,
          (2 / 3) * likeAverageTime
        );
        while (scrollTime - likeCurrentTime < waitTimeLike) {
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
  return logErrors;
}

export default featureLikeX;
