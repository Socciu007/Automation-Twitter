const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

// Luot newsfeed
async function featureAutoScrollX(page, durationInMinutes) {
  try {
    await page.evaluate(async (durationInMinutes) => {
      await new Promise((resolve, reject) => {
        const random = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        //Luot newsfeed trong mili giay
        const durationInMilliseconds = durationInMinutes * 60 * 1000;
        const startTime = new Date().getTime();
        let currentTime = new Date().getTime();

        const scrollInterval = setInterval(async () => {
          window.scrollBy(0, random(100, 700));
          currentTime = new Date().getTime();
          await delay(random(1000, 3000));

          if (currentTime - startTime >= durationInMilliseconds) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, 1000);
      });
    }, durationInMinutes);
  } catch (error) {
    console.log("Tinh nang luot newsfeed loi", error);
  }
}

export default featureAutoScrollX;
