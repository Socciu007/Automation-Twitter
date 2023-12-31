const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featurePostStatusX(page, scrollTime, body = {}) {
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
    await delay(random(1000, 3000));

    const data = [
      "Hôm nay that la zuiii",
      "Thật là tuyệt vời",
      "Viet nam ....",
      "hanh phuc qua...",
    ];
    const elementPost = await page.$(
      'a[data-testid="SideNav_NewTweet_Button"]'
    );
    if (elementPost) {
      await elementPost.click();
      await delay(random(1000, 3000));
      await page.type(
        'div[data-contents="true"] > div[data-block="true"]',
        data[Math.floor(Math.random() * data.length)]
      );
      await delay(random(1000, 3000));
    } else {
      try {
        await page.type(
          'div[data-testid="tweetTextarea_0"]',
          data[Math.floor(Math.random() * data.length)]
        );
        await delay(random(1000, 3000));
      } catch (error) {
        logErrors.push({
          error: "title error",
          detail: error.message,
        });
      }
    }

    const { status, image, gif, emoji, poll, schedule } = body;
    if (status) {
      try {
        const clickStatus = await page.$(status);
        if (!clickStatus) {
          logErrors.push({
            error: "title error",
            detail: "Can't button status",
          });
        }
        await clickStatus.click();
        await delay(random(1000, 3000));
        const selectStatus = await page.$$('div[role="menuitem"]'); //4 option: [ everyone, accounts you follow, verified accounts, only accounts you mention]
        if (!selectStatus) {
          logErrors.push({
            error: "title error",
            detail: "Can't select status for postX",
          });
        }
        await selectStatus[0].click();
        await delay(random(1000, 3000));
      } catch (error) {
        logErrors.push({
          error: "title error",
          detail: error.message,
        });
      }
    }

    if (image) {
      try {
        const [fileAvatar] = await Promise.all([
          page.waitForFileChooser(),
          page.click(image),
        ]);

        await fileAvatar.accept(["./avt1.jpeg"]);
        await delay(random(1000, 3000));
      } catch (error) {
        logErrors.push({
          error: "title error",
          detail: error.message,
        });
      }
    }

    if (gif) {
      try {
        const buttonGif = await page.$(gif);
        if (!buttonGif) {
          logErrors.push({
            error: "title error",
            detail: "Can't select gif",
          });
        }
        await buttonGif.click();
        await delay(random(1000, 3000));

        const selectGif = await page.$$('div > img[draggable="false"]');
        if (!selectGif) {
          logErrors.push({
            error: "title error",
            detail: "Can't select topic gif",
          });
        }
        const selectedGif = selectGif.slice(0, 8);
        const indexRandom_0 = Math.floor(Math.random() * 8);
        await delay(random(1000, 3000));
        await selectedGif[indexRandom_0].click();
        await delay(random(1000, 3000));

        const clickGif = await page.$$(
          'div[data-testid="gifSearchGifImage"] > img[draggable="false"]'
        );
        const indexRandom_1 = Math.floor(Math.random() * 10);
        await delay(random(1000, 3000));
        await clickGif[indexRandom_1].click();
        await delay(random(1000, 3000));
      } catch (error) {
        logErrors.push({
          error: "title error",
          detail: error.message,
        });
      }
    }

    if (emoji) {
      try {
        const clickEmoji = await page.$(emoji);
        await clickEmoji.click();
        await delay(random(1000, 3000));

        const selectEmoji = await page.$$('div[aria-selected="false"]');
        const indexRandom = Math.floor(Math.random() * 50);
        await delay(random(1000, 3000));
        await selectEmoji[indexRandom].click();
        await delay(random(1000, 3000));
        console.log("Chon emoji thanh cong");
      } catch (error) {
        console.log("Khong the chon emoji");
      }
    }

    if (poll) {
      try {
        const clickPoll = await page.$(poll);
        if (!clickPoll) {
          logErrors.push({
            error: "title error",
            detail: "Can't find button poll of post",
          });
        }
        await clickPoll.click();
        await delay(random(1000, 3000));

        try {
          await page.type(
            "input[name=Choice1]",
            data[Math.floor(Math.random() * data.length)]
          );
          await delay(random(1000, 3000));
          await page.type(
            "input[name=Choice2]",
            data[Math.floor(Math.random() * data.length)]
          );
          await delay(random(1000, 3000));
        } catch (error) {
          logErrors.push({
            error: "title error",
            detail: error.message,
          });
        }
        //Them option (neu muon)
        // const addChoice = await page.$('div[aria-label="Add a choice"]');
        // await addChoice.click()
        // await delay(random(1000, 3000));
        // await page.type("input[name=Choice3]", "Option3");

        // Setup time poll
        // const addChoice = await page.$('select[data-testid="selectPollDays"]');
        // await addChoice.click()
      } catch (error) {
        logErrors.push({
          error: "title error",
          detail: error.message,
        });
      }
    }
    await delay(random(1000, 3000));

    const clickPost_0 = await page.$('div[data-testid="tweetButtonInline"]');
    const clickPost_1 = await page.$('div[data-testid="tweetButton"]');
    if (clickPost_0 || clickPost_1) {
      try {
        await delay(random(1000, 3000));
        await clickPost_1.click();
        await delay(random(1000, 3000));
        await clickPost_0.click();
        await delay(random(1000, 3000));
      } catch (error) {
        logErrors.push({
          error: "title error",
          detail: error.message,
        });
      }
    }
  } catch (error) {
    logErrors.push({
      error: "title error",
      detail: error.message,
    });
  }
}

export default featurePostStatusX;
