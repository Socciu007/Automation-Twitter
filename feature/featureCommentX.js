const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

// Tinh nang comments
async function featureCommentX(
  page,
  durationInMinutes,
  numberStart,
  numberFinish
) {
  try {
    await page.mouse.wheel({ deltaY: random(300, 1000) });
    await delay(random(1000, 3000));
    // Luot newsfeed trong durationInMinutes
    const durationInMilliseconds = durationInMinutes * 60 * 1000;

    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    while (currentTime - startTime < durationInMilliseconds) {
      while (numberStart < numberFinish) {
        const commentElements = await page.$$('div[data-testid="reply"]');
        console.log(commentElements.length);

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

        await page.evaluate(async (positionComment) => {
          const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const scrollInterval = setInterval(() => {
              window.scrollBy(0, random(100, 500));
              totalHeight += random(100, 500);

              if (totalHeight >= positionComment.y) {
                clearInterval(scrollInterval);
                resolve();
              }
            }, 1000);
          });
        }, positionComment);

        await commentElements[indexRandom].click();
        await delay(random(1000, 3000));

        if (!page.isClosed()) {
          //Viet comment
          await page.type('div[data-contents="true"]', replyRandom.comment);
          await delay(random(1000, 3000));
          //Enter
          await page.click('div[data-testid="tweetButton"]');
          await delay(random(1000, 3000));
          console.log("da comment");
        }
        await page.evaluate(async () => {
          const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          window.scrollBy(0, random(200, 500));
        });
        await delay(random(1000, 3000));

        await page.evaluate(async () => {
          const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          window.scrollBy(0, random(200, 500));
        });
        await delay(random(1000, 3000));

        await page.evaluate(async () => {
          const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          window.scrollBy(0, random(200, 500));
        });
        await delay(random(1000, 3000));

        await page.evaluate(async () => {
          const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          window.scrollBy(0, random(200, 500));
        });
        await delay(random(1000, 3000));

        numberStart++;
      }
      await page.evaluate(async () => {
        window.scrollBy(0, window.innerHeight);
      });
      await delay(random(1000, 3000));

      // Cap nhat thoi gian hien tai
      currentTime = new Date().getTime();
    }
  } catch (error) {
    console.log("Tinh nang comment khong thuc hien duoc.");
  }
}

export default featureCommentX;