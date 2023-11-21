const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function featurePostStatusX(page, scrollTime, body = {}) {
  try {
    // Luot newsfeed trong durationInMinutes
    const scrollTimeInMilliseconds = scrollTime * 60 * 1000;

    const startTime = new Date().getTime();
    let currentTime = new Date().getTime();
    while (currentTime - startTime < scrollTimeInMilliseconds) {
      await page.evaluate(async () => {
        const random = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        window.scrollBy(0, random(100, 300));
      });
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
      await page.type(
        'div[data-testid="tweetTextarea_0"]',
        data[Math.floor(Math.random() * data.length)]
      );
      await delay(random(1000, 3000));
    }

    const { status, image, gif, emoji, poll, schedule } = body;
    if (status) {
      try {
        const clickStatus = await page.$(status);
        await clickStatus.click();
        await delay(random(1000, 3000));
        const selectStatus = await page.$$('div[role="menuitem"]'); //4 option: [ everyone, accounts you follow, verified accounts, only accounts you mention]
        await selectStatus[0].click();
        await delay(random(1000, 3000));
        console.log("Chon status thanh cong");
      } catch (error) {
        console.log("Khong the chon status");
      }
    }

    if (image) {
      try {
        const [fileAvatar] = await Promise.all([
          page.waitForFileChooser(),
          page.click(image),
        ]);

        await fileAvatar.accept(["./avt1.jpeg"]);
        console.log("Chon image thanh cong");
        await delay(random(1000, 3000));
      } catch (error) {
        console.log("Khong the tai image");
      }
    }

    if (gif) {
      try {
        const buttonGif = await page.$(gif);
        await buttonGif.click();
        await delay(random(1000, 3000));

        const selectGif = await page.$$('div > img[draggable="false"]');
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
        console.log("Chon gif thanh cong");
      } catch (error) {
        console.log("Khong the chon gif");
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
        await clickPoll.click();
        await delay(random(1000, 3000));

        await page.type("input[name=Choice1]", "Option1");
        await delay(random(1000, 3000));
        await page.type("input[name=Choice2]", "Option2");
        await delay(random(1000, 3000));
        //Them option (neu muon)
        // const addChoice = await page.$('div[aria-label="Add a choice"]');
        // await addChoice.click()
        // await delay(random(1000, 3000));
        // await page.type("input[name=Choice3]", "Option3");

        // Setup time poll
        // const addChoice = await page.$('select[data-testid="selectPollDays"]');
        // await addChoice.click()
      } catch (error) {
        console.log("Khong the tao poll");
      }
    }
    await delay(random(1000, 3000));

    const clickPost_0 = await page.$('div[data-testid="tweetButtonInline"]');
    const clickPost_1 = await page.$('div[data-testid="tweetButton"]');
    if (clickPost_0 || clickPost_1) {
      await delay(random(1000, 3000));
      await clickPost_1.click();
      await delay(random(1000, 3000));
      await clickPost_0.click();
      await delay(random(1000, 3000));
      console.log("Dang status thanh cong");
    }
  } catch (error) {
    console.log("Tinh nang dang status khong thuc hien duoc.", error);
  }
}

export default featurePostStatusX;