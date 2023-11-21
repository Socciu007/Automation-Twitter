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
  try {
    await page.mouse.wheel({ deltaY: random(300, 1000) });
    await delay(random(1000, 3000));

    const durationInMilliseconds = durationInMinutes * 60 * 1000;
    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();

    while (currentTime - startTime < durationInMilliseconds) {
      let likeStartTime = (20 / 100) * durationInMilliseconds;
      while (currentTime - startTime < likeStartTime) {
        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));
        currentTime = new Date().getTime();
      }

      while (numberStart < numberFinish) {
        await delay(random(1000, 3000));
        const likeElements = await page.$$('div[data-testid="like"]');
        await delay(random(1000, 3000));
        console.log(likeElements.length);

        if (likeElements.length === 0) {
          throw new Error("Khong tim thay phan tu like");
        }

        const indexRandom = Math.floor(Math.random() * likeElements.length);
        const positionLike = await likeElements[indexRandom].boundingBox();
        await delay(random(1000, 3000));

        let totalHeight = 0;
        while (totalHeight < positionLike.y) {
          await page.mouse.wheel({ deltaY: random(300, 1000) });
          await delay(random(1000, 3000));
          totalHeight += random(100, 500);
        }

        await delay(random(1000, 3000));
        await likeElements[indexRandom].click();
        await delay(random(1000, 3000));

        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));

        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));

        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));

        numberStart++;
      }

      await page.evaluate(async () => {
        await page.mouse.wheel({ deltaY: random(300, 1000) });
      });
      await delay(random(1000, 3000));

      currentTime = new Date().getTime();
    }
  } catch (error) {
    console.log("Tinh nang like khong thuc hien duoc.", error);
  }
}

export default featureLikeX;
