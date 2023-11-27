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

    // const buttonFollowing = await page.$(
    //   "a.1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-1loqt21"
    // );
    const buttonFollowing = await page.$("div.css-175oi2r.r-1mf7evn");
    await delay(random(1000, 3000));
    if (buttonFollowing) {
      await buttonFollowing.click();
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
      const buttonUnfollow = await page.$$("div.css-175oi2r.r-19u6a5r");
      await delay(random(1000, 3000));
      console.log(buttonUnfollow.length);
      if (buttonUnfollow.length === 0) {
        logErrors.push({
          error: "title error",
          detail: "Can't find unfollowing button",
        });
        return;
      }
      const index = random(0, buttonUnfollow.length - 1);
      const positionUnfollow = await buttonUnfollow[index].boundingBox();
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
      await buttonUnfollow[index].click();
      await delay(random(1000, 3000));
      const buttonConfirmUn_1 = await page.$(
        "div.css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-q4m81j.r-a023e6.r-rjixqe.r-b88u0q.r-1awozwy.r-6koalj.r-18u37iz.r-16y2uox.r-1777fci"
      );
      const buttonConfirmUn_0 = await page.$(
        'div[data-testid="confirmationSheetConfirm"]'
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
