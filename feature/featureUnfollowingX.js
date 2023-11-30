const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featureUnfollowingX(page, logErrors) {
  try {
    const buttonProfile_0 = await page.$(
      'a[data-testid="AppTabBar_Profile_Link"]'
    );
    await delay(random(1000, 3000));
    const buttonProfile_1 = await page.$('a[aria-label="Profile"]');
    await delay(random(1000, 3000));
    if (buttonProfile_0) {
      await buttonProfile_0.click();
      await delay(random(1000, 3000));
    } else if (buttonProfile_1) {
      await buttonProfile_1.click();
      await delay(random(1000, 3000));
    } else {
      logErrors.push({
        error: "title errorr",
        message: "Can't find button profile",
      });
      return;
    }

    const buttonFollowing_1 = await page.$("div.css-175oi2r.r-1mf7evn");
    const buttonFollowing_0 = await page.$(
      "span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3.r-1b43r93.r-1cwl3u0"
    );
    await delay(random(1000, 3000));
    if (buttonFollowing_0) {
      await buttonFollowing_0.click();
      await delay(random(1000, 3000));
    } else if (buttonFollowing_1) {
      await buttonFollowing_1.click();
      await delay(random(1000, 3000));
    } else {
      logErrors.push({
        error: "title error",
        detail: "Can't find person following button",
      });
      return;
    }
    let countUnfollow = 0;
    while (countUnfollow < random(1, 3)) {
      const buttonUnfollow_0 = await page.$x(
        '//section//div//div//div//div//div//div//div//div[2]//div[1]//div//div//div//span[@class="css-1qaijid r-dnmrzs r-1udh08x r-3s2u2q r-bcqeeo r-qvutc0 r-poiln3 r-1b43r93 r-1cwl3u0"]//span[@class="css-1qaijid r-bcqeeo r-qvutc0 r-poiln3"]'
      );
      const buttonUnfollow_1 = await page.$$(
        "span.css-1qaijid.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-poiln3.r-1b43r93.r-1cwl3u0"
      );
      console.log("length", buttonUnfollow_0.length, buttonUnfollow_1.length);
      await delay(random(1000, 3000));
      if (buttonUnfollow_0.length > 0) {
        const index = random(0, buttonUnfollow_0.length - 1);
        const positionUnfollow = await buttonUnfollow_0[index].boundingBox();
        if (!positionUnfollow) {
          logErrors.push({
            error: "title error",
            detail: "Can't find unfollowing position",
          });
          return;
        }
        let totalHeight = 0;
        while (totalHeight <= positionUnfollow.y) {
          await page.mouse.wheel({ detalY: random(500, 1000) });
          await delay(random(500, 1000));
          totalHeight += random(500, 1000);
        }
        await buttonUnfollow_0[index].click();
        await delay(random(1000, 3000));
        const buttonConfirmUn_0 = await page.$(
          'div[data-testid="confirmationSheetConfirm"]'
        );
        const buttonConfirmUn_1 = await page.$(
          "div.css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-q4m81j.r-a023e6.r-rjixqe.r-b88u0q.r-1awozwy.r-6koalj.r-18u37iz.r-16y2uox.r-1777fci"
        );

        if (buttonConfirmUn_0) {
          await buttonConfirmUn_0.click();
          await delay(random(1000, 3000));
        } else if (buttonConfirmUn_1) {
          await buttonConfirmUn_1.click();
          await delay(random(1000, 3000));
        } else {
          logErrors.push({
            error: "title error",
            detail: "Confirm unfollowing is not success",
          });
          return;
        }
      } else if (buttonUnfollow_1.length > 0) {
        const index = random(0, buttonUnfollow_1.length - 1);
        const positionUnfollow = await buttonUnfollow_1[index].boundingBox();
        if (!positionUnfollow) {
          logErrors.push({
            error: "title error",
            detail: "Can't find unfollowing position",
          });
          return;
        }
        let totalHeight = 0;
        while (totalHeight <= positionUnfollow.y) {
          await page.mouse.wheel({ detalY: random(500, 1000) });
          await delay(random(500, 1000));
          totalHeight += random(500, 1000);
        }
        await buttonUnfollow_1[index].click();
        await delay(random(1000, 3000));
        const buttonConfirmUn_0 = await page.$(
          'div[data-testid="confirmationSheetConfirm"]'
        );
        const buttonConfirmUn_1 = await page.$(
          "div.css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-q4m81j.r-a023e6.r-rjixqe.r-b88u0q.r-1awozwy.r-6koalj.r-18u37iz.r-16y2uox.r-1777fci"
        );

        if (buttonConfirmUn_0) {
          await buttonConfirmUn_0.click();
          await delay(random(1000, 3000));
        } else if (buttonConfirmUn_1) {
          await buttonConfirmUn_1.click();
          await delay(random(1000, 3000));
        } else {
          logErrors.push({
            error: "title error",
            detail: "Confirm unfollowing is not success",
          });
          return;
        }
      } else {
        logErrors.push({
          error: "title error",
          detail: "Can't find unfollowing button",
        });
        return;
      }
      countUnfollow++;
    }
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
}

export default featureUnfollowingX;
