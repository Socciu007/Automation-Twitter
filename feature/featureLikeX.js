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
      let likeStartTime = (5 / 100) * durationInMilliseconds;
      while (currentTime - startTime < likeStartTime) {
        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));
        currentTime = new Date().getTime();
      }

      const likeAverageTime =
        durationInMilliseconds / (numberFinish - numberStart);

      while (numberStart < numberFinish) {
        const likeElements = await page.$$('div[data-testid="like"]');
        await delay(random(1000, 3000));
        console.log("likeElements", likeElements.length);

        if (likeElements.length === 0) {
          throw new Error("Khong tim thay phan tu like");
        }

        let indexRandom = Math.floor(Math.random() * likeElements.length);
        const positionLike = await likeElements[indexRandom].boundingBox();
        await delay(random(1000, 3000));
        console.log("positionLike", indexRandom, positionLike.y);

        const scrollToLike = async (totalHeight, likeAverageTime) => {
          if (totalHeight < positionLike.y) {
            await page.mouse.wheel({ deltaY: random(300, 1000) });
            await delay(random(1000, 3000));
            console.log(totalHeight);
            return await scrollToLike(totalHeight + random(300, 1000));
          }

          if (likeElements[indexRandom]) {
            await likeElements[indexRandom].click();
            await delay(random(1000, 3000));
            const likeCurrentTime = new Date().getTime();
            let scrollTime = new Date().getTime();

            while (scrollTime - likeCurrentTime < (2 / 3) * likeAverageTime) {
              await page.mouse.wheel({ deltaY: random(300, 1000) });
              await delay(random(1000, 3000));
              scrollTime = new Date().getTime();
              console.log(scrollTime - likeCurrentTime, likeAverageTime);
            }
            return;
          }

          await delay(random(1000, 3000));
          return;
        };
        await scrollToLike(random(0, 100), likeAverageTime);
        await delay(random(1000, 3000));

        numberStart++;
      }

      await page.mouse.wheel({ deltaY: random(300, 1000) });
      await delay(random(1000, 3000));

      currentTime = new Date().getTime();
    }
  } catch (error) {
    console.log("Tinh nang like khong thuc hien duoc.", error);
  }
}

export default featureLikeX;
