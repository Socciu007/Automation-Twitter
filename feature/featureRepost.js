import delay from "../delay";
// Tinh nang repost
async function featureRepostX(
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

    while (currentTime - startTime < durationInMilliseconds) {
      const repostElements = await page.$$('div[data-testid="retweet"]');
      console.log(repostElements.length);
      if (repostElements === null) {
        throw new Error("Khong tim thay phan tu repost");
      }

      while (numberStart < numberFinish) {
        const indexRandom = Math.floor(Math.random() * repostElements.length);
        await repostElements[indexRandom].click();
        await delay(1000);
        await page.click('div[data-testid="retweetConfirm"]');
        await delay(3000);

        numberStart++;
      }

      await page.evaluate(async () => {
        window.scrollBy(0, window.innerHeight);
      });
      await delay(1000);

      // Cap nhat thoi gian hien tai
      currentTime = new Date().getTime();
    }
  } catch (error) {
    console.log("Tinh nang repost khong thuc hien duoc.");
  }
}

export default featureRepostX;
