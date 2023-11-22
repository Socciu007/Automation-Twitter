const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

async function featureCommentX(
  page,
  durationInMinutes,
  numberStart,
  numberFinish
) {
  try {
    await page.mouse.wheel({ deltaY: random(300, 1000) });
    await delay(random(1000, 3000));

    const durationInMilliseconds = durationInMinutes * 60 * 1000;
    const commentAverageTime =
      durationInMilliseconds / (numberFinish - numberStart);
    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();

    while (currentTime - startTime < durationInMilliseconds) {
      let breakTime = (5 / 100) * durationInMilliseconds;
      while (currentTime - startTime < breakTime) {
        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));
        currentTime = new Date().getTime();
      }
      while (numberStart < numberFinish) {
        const commentElements = await page.$$('div[data-testid="reply"]');
        await delay(random(1000, 3000));
        if (commentElements.length === 0) {
          throw new Error("Khong tim thay phan tu reply");
        }

        const indexRandom = Math.floor(Math.random() * commentElements.length);

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

        const positionComment = await commentElements[
          indexRandom
        ].boundingBox();
        let totalHeight = 0;

        while (totalHeight < positionComment.y) {
          await page.mouse.wheel({ deltaY: random(300, 1000) });
          await delay(random(1000, 3000));
          totalHeight += random(300, 1000);
        }

        await page.mouse.wheel({ deltaY: random(300, 1000) });
        await delay(random(1000, 3000));

        await commentElements[indexRandom].click();
        await delay(random(1000, 3000));

        await page.type('div[data-contents="true"]', replyRandom.comment);
        await delay(random(1000, 3000));

        await page.click('div[data-testid="tweetButton"]');
        await delay(random(1000, 3000));

        const commentCurrentTime = new Date().getTime();
        let scrollTime = new Date().getTime();

        while (scrollTime - commentCurrentTime < (2 / 3) * commentAverageTime) {
          await page.mouse.wheel({ deltaY: random(300, 1000) });
          await delay(random(1000, 3000));
          scrollTime = new Date().getTime();
        }

        numberStart++;
      }

      await page.mouse.wheel({ deltaY: random(300, 1000) });
      await delay(random(1000, 3000));

      currentTime = new Date().getTime();
    }
  } catch (error) {
    console.log("Tinh nang comment khong thuc hien duoc.");
  }
}

export default featureCommentX;
