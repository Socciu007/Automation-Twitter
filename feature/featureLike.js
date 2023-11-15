// Tinh nang like
async function featureLike(page, numberStart, numberFinish) {
  try {
    const likeElements = await page.$$('div[data-testid="like"]');

    if (likeElements === null) {
      throw new Error("Khong tim thay phan tu like");
    }
    // const elementLikeRandom = likeElements
    //   .sort(() => Math.random() - 0.5)
    //   .slice(0, numberStart);
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 100;
        const scrollInterval = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight <= scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, 1000);
      });
    });
    // for (const clickLike of elementLikeRandom) {
    //   await clickLike.click();
    //   await delay(1000);
    // }

    if (numberStart < numberFinish) {
      const indexRandom = Math.ceil(2 * Math.random() + numberStart / 2);
      await likeElements[indexRandom].click();
      await delay(1000);
      return await featureLike(page, numberStart + 1, numberFinish);
    }
  } catch (error) {
    console.log("Tinh nang like khong thuc hien duoc.");
  }
}
