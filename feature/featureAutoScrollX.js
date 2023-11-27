const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
async function featureAutoScrollX(page, scrollTime) {
  let logErrors = [];
  try {
    const scrollTimeInMilliseconds = scrollTime * 60 * 1000;
    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    while (currentTime - startTime < scrollTimeInMilliseconds) {
      await page.mouse.wheel({ deltaY: random(300, 1000) });
      await delay(random(1000, 3000));
      currentTime = new Date().getTime();
    }
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
}
export default featureAutoScrollX;
