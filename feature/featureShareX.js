const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureRepostAddTittleX(
  page,
  durationInMinutes,
  numberStart,
  numberFinish
) {
  try {
    // Luot newsfeed trong durationInMinutes
    const durationInMilliseconds = durationInMinutes * 60 * 1000;

    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    while (currentTime - startTime <= durationInMilliseconds) {
      //luot status 1/5 time
      let breakTime = (20 / 100) * durationInMilliseconds;
      while (currentTime - startTime < breakTime) {
        await page.evaluate(async () => {
          const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          window.scrollBy(0, random(100, 300));
        });
        await delay(random(1000, 3000));
        currentTime = new Date().getTime();
      }
      while (numberStart < numberFinish) {
        const repostElements = await page.$$('div[data-testid="retweet"]');

        if (repostElements.length === 0) {
          throw new Error("Khong tim thay phan tu repost");
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

        await repostElements[indexRandom].click();
        await delay(random(1000, 3000));

        await page.click('a[href="/compose/tweet"]');
        await delay(random(1000, 3000));

        await page.type('div[data-contents="true"]', replyRandom.comment);
        await delay(random(1000, 3000));

        await page.click('div[data-testid="tweetButton"]');
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
    console.log("Tinh nang repost khong thuc hien duoc.");
  }
}

export default featureRepostAddTittleX;
