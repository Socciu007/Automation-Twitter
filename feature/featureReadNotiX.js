const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureReadNotiX(page) {
  let logErrors = [];
  try {
    let numberNoti = 0;
    while (numberNoti < random(1, 3)) {
      const buttonNoti_0 = await page.$(
        'a[data-testid="AppTabBar_Notifications_Link"]'
      );
      const buttonNoti_1 = await page.$('a[aria-label="Notifications"]');
      if (buttonNoti_0) {
        await buttonNoti_0.click();
        await delay(random(1000, 3000));
      } else if (buttonNoti_1) {
        await buttonNoti_1.click();
        await delay(random(1000, 3000));
      } else {
        logErrors.push({
          error: "title error",
          detail: "Can't find button notifications",
        });
        return;
      }

      //   const selectNoti = await page.$$('div[data-testid="cellInnerDiv"]');
      const selectNoti_0 = await page.$$("ul.r-mabqd8");
      const selectNoti_1 = await page.$$('ul[role="list"]');

      if (selectNoti_0) {
        const indexRandom = random(0, selectNoti_0.length - 1);
        const positionNoti = await selectNoti_0[indexRandom].boundingBox();
        let totalHeight = 0;
        while (totalHeight < positionNoti.y) {
          await page.mouse.wheel({ deltaY: random(100, 500) });
          await delay(random(1000, 3000));
          totalHeight += random(100, 500);
        }
        try {
          await selectNoti_0[indexRandom].click();
          await delay(random(1000, 3000));
        } catch (error) {
          logErrors.push({
            error: "title error",
            detail: error.message,
          });
          return;
        }
        numberNoti++;
      } else if (selectNoti_1) {
        const indexRandom = random(0, selectNoti_1.length - 1);
        const positionNoti = await selectNoti_1[indexRandom].boundingBox();
        let totalHeight = 0;
        while (totalHeight < positionNoti.y) {
          await page.mouse.wheel({ deltaY: random(100, 500) });
          await delay(random(1000, 3000));
          totalHeight += random(100, 500);
        }
        try {
          await selectNoti_1[indexRandom].click();
          await delay(random(1000, 3000));
        } catch (error) {
          logErrors.push({
            error: "title error",
            detail: error.message,
          });
          return;
        }
        numberNoti++;
      }
    }
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
    return logErrors;
  }
}

export default featureReadNotiX;