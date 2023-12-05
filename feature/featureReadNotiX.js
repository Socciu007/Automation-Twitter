const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureReadNotiX(page, logErrors) {
  try {
    await page.goto("https://twitter.com", {
      timeout: 60000,
      waitUntil: "networkidle2",
    });
    await delay(random(2000, 5000));
    const currentUrl = await page.url();
    if (!currentUrl.includes("twitter.com/home")) {
      logErrors.push({
        error: "title error",
        detail: "You need to log in X",
      });
      return;
    }
    let numberNoti = 0;
    while (numberNoti < random(1, 3)) {
      await delay(random(2000, 5000));
      const buttonNoti_0 = await page.$(
        'a[data-testid="AppTabBar_Notifications_Link"]'
      );
      const buttonNoti_1 = await page.$('a[aria-label="Notifications"]');
      await delay(random(2000, 5000));
      if (buttonNoti_0) {
        await buttonNoti_0.click();
        await delay(random(2000, 5000));
      } else if (buttonNoti_1) {
        await buttonNoti_1.click();
        await delay(random(2000, 5000));
      } else {
        logErrors.push({
          error: "title error",
          detail: "Can't find button notifications",
        });
        return;
      }
      const selectNoti_0 = await page.$$("ul.r-mabqd8");
      const selectNoti_1 = await page.$$('ul[role="list"]');

      if (selectNoti_0.length > 0) {
        if (selectNoti_0.length === 1) {
          await selectNoti_0[0].click();
          await delay(random(4000, 7000));
          return;
        } else if (selectNoti_1.length === 1) {
          await selectNoti_1[0].click();
          await delay(random(4000, 7000));
          return;
        }

        if (selectNoti_0.length === 2) {
          await selectNoti_0[random(0, 1)].click();
          await delay(random(4000, 7000));
          return;
        } else if (selectNoti_1.length === 2) {
          await selectNoti_1[random(0, 1)].click();
          await delay(random(4000, 7000));
          return;
        }
        const indexRandom = random(0, selectNoti_0.length - 1);
        const positionNoti = await selectNoti_0[indexRandom].boundingBox();
        if (!positionNoti) {
          logErrors.push({
            error: "title error",
            detail: "Can't find position of button notifications to click",
          });
          return;
        }
        let totalHeight = 0;
        while (totalHeight < positionNoti.y) {
          await page.mouse.wheel({ deltaY: random(200, 500) });
          await delay(random(2000, 5000));
          totalHeight += random(200, 500);
        }

        await delay(random(5000, 10000));
        await selectNoti_0[indexRandom].click();
        await delay(random(2000, 5000));

        numberNoti++;
      } else if (selectNoti_1.length > 0) {
        const indexRandom = random(0, selectNoti_1.length - 1);
        const positionNoti = await selectNoti_1[indexRandom].boundingBox();
        await delay(random(2000, 5000));
        let totalHeight = 0;
        while (totalHeight < positionNoti.y) {
          await page.mouse.wheel({ deltaY: random(200, 500) });
          await delay(random(2000, 5000));
          totalHeight += random(200, 500);
        }

        await selectNoti_1[indexRandom].click();
        await delay(random(2000, 5000));

        numberNoti++;
      } else {
        logErrors.push({
          error: "title error",
          detail: "There are no notifications to display",
        });
        return;
      }
    }
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
}

export default featureReadNotiX;
