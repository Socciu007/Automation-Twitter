const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

// Luot newsfeed
async function featureAutoScroll(page, durationInMinutes) {
  // Luot newsfeed trong durationInMinutes
  const durationInMilliseconds = durationInMinutes * 60 * 1000;
  await page.evaluate(async (durationInMilliseconds) => {
    const startTime = new Date().getTime();
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let totalHeight = 0;
    window.scrollBy(0, random(100, 500));
    totalHeight += random(100, 500);
    //currentTime = new Date().getTime();
    let currentTime = new Date().getTime();
    if (currentTime - startTime >= durationInMilliseconds) {
      return;
    }
    await delay(random(1000, 3000));
  }, durationInMilliseconds);
}

export default featureAutoScroll;
