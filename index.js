import Hidemyacc from "./hidemyacc.js";
import puppeteer from "puppeteer-core";
import PublicGoogleSheetsParser from "public-google-sheets-parser";
import featureAutoScroll from "./feature/featureAutoScroll.js";
// import featureLikeX from "./feature/featureLikeX.js";
// import featureCommentX from "./feature/featureCommentX.js";
// import featureRepostX from "./feature/featureRepost.js";
const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const hideMyAcc = new Hidemyacc();

(async () => {
  //get profiles
  const profiles = await hideMyAcc.profiles();
  runProfiles(profiles, 1);
  return;
})();

// Ham run profiles
async function runProfiles(profiles, numberProfile) {
  try {
    //Lay so luong tai khoan run
    const account = profiles.data.slice(0, numberProfile);
    const results = await account.map(async (profile) => {
      const response = await hideMyAcc.start(profile.id, {
        startUrl: "about:blank",
      });

      if (!response) {
        throw new Error(`Khong mo duoc trinh duyet port`);
      }

      const browser = await puppeteer.connect({
        browserWSEndpoint: response.data.wsUrl,
        defaultViewport: null,
        slowMo: 60,
      });

      const pages = await browser.pages();
      let page;
      if (pages.length) {
        page = pages[0];
      } else {
        page = await browser.newPage();
      }

      await page.goto("https://twitter.com/home", {
        timeout: 30000,
        waitUntil: "networkidle2",
      });

      await featureAutoScroll(page, 1);
      await delay(3000);
      // await featureLikeX(page, 2, 0, 3);
      // await featureCommentX(page, 2, 0, 4);
      // await featureRepostX(page, 2, 0, 4);
      // await featurePostStatus(page, {
      //   status: 'div[aria-label="Everyone can reply"]',
      //   image: 'div[aria-label="Add photos or video"]',
      //   //gif: 'div[aria-label="Add a GIF"]',
      //   // emoji: 'div[aria-label="Add emoji"]',
      //   //poll: 'div[aria-label="Add poll"]',
      //   // schedule: 'div[aria-label="Schedule post"]'
      // });
      // return { browser, page };
    });

    //run cac tai khoan cung 1 luc
    const openProfiles = await Promise.all(results);
  } catch (error) {
    console.error("Loi khong chay duoc profiles", error);
  }
}

// Tinh nang repost
async function featureRepost(page, numberStart, numberFinish) {
  try {
    const repostElements = await page.$$('div[data-testid="retweet"]');

    if (repostElements === null) {
      throw new Error("Khong tim thay phan tu repost");
    }

    if (numberStart < numberFinish) {
      const indexRandom = Math.ceil(2 * Math.random() + numberStart / 2);
      await repostElements[indexRandom].click();
      await delay(1000);
      await page.click('div[data-testid="retweetConfirm"]');
      await delay(3000);
      return await featureRepost(page, numberStart + 1, numberFinish);
    }
  } catch (error) {
    console.log("Tinh nang repost khong thuc hien duoc.");
  }
}

// Tinh nang repost co comment
async function featureRepostAddComment(page, numberStart, numberFinish) {
  try {
    const repostElements = await page.$$('div[data-testid="retweet"]');

    if (repostElements === null) {
      throw new Error("Khong tim thay phan tu repost");
    }

    const parser = new PublicGoogleSheetsParser(
      "1iMJRnTjJKkO-WQv66LMmW6a1YzMivbvPn9l4lXl2DFI"
    );
    const listReply = await parser.parse(
      "1iMJRnTjJKkO-WQv66LMmW6a1YzMivbvPn9l4lXl2DFI",
      "X"
    );
    if (listReply === null) {
      throw new Error("Khong lay duoc du lieu comment");
    }
    const replyRandom = listReply[Math.floor(Math.random() * listReply.length)];

    if (numberStart < numberFinish) {
      const indexRandom = Math.floor(2 * Math.random() + numberStart);
      await repostElements[indexRandom].click();
      console.log(indexRandom);
      await delay(1000);
      await page.click('a[href="/compose/tweet"]');
      await delay(1000);
      await page.type('div[data-contents="true"]', replyRandom.Comments);
      await page.click('div[data-testid="tweetButton"]');
      await delay(1000);
      return await featureRepostAddComment(page, numberStart + 1, numberFinish);
    }
  } catch (error) {
    console.log("Tinh nang repost khong thuc hien duoc.");
  }
}

// Tinh nang dang status
async function featurePostStatus(page, body = {}) {
  try {
    await page.type(
      'div[data-testid="tweetTextarea_0"]',
      "Hom nay that là zuiii"
    );

    const { status, image, gif, emoji, poll, schedule } = body;
    if (status) {
      try {
        const clickStatus = await page.$(status);
        await clickStatus.click();
        await delay(1000);
        const selectStatus = await page.$$('div[role="menuitem"]'); //4 option: [ everyone, accounts you follow, verified accounts, only accounts you mention]
        await selectStatus[0].click();
        await delay(1000);
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
        await delay(3000);
      } catch (error) {
        console.log("Khong the tai image");
      }
    }

    if (gif) {
      try {
        const buttonGif = await page.$(gif);
        await buttonGif.click();
        await delay(1000);
        const selectGif = await page.$$('div > img[draggable="false"]');
        const selectedGif = selectGif.slice(0, 8);
        const indexRandom_0 = Math.floor(Math.random() * 8);
        await delay(1000);
        await selectedGif.slice(0, 8)[indexRandom_0].click();
        await delay(1000);
        const clickGif = await page.$$('div[data-testid="gifSearchGifImage"]');
        const indexRandom_1 = Math.floor(Math.random() * 50);
        await delay(1000);
        await clickGif[indexRandom_1].click();
        await delay(3000);
        console.log("Chon gif thanh cong");
      } catch (error) {
        console.log("Khong the chon gif");
      }
    }

    if (emoji) {
      try {
        const clickEmoji = await page.$(emoji);
        await clickEmoji.click();
        await delay(1000);
        const selectEmoji = await page.$$('div[aria-selected="false"]');
        const indexRandom = Math.floor(Math.random() * 50);
        await delay(1000);
        await selectEmoji[indexRandom].click();
        await delay(3000);
        console.log("Chon emoji thanh cong");
      } catch (error) {
        console.log("Khong the chon emoji");
      }
    }

    if (poll) {
      try {
        const clickPoll = await page.$(poll);
        await clickPoll.click();
        await delay(1000);
        await page.type("input[name=Choice1]", "Option1");
        await delay(1000);
        await page.type("input[name=Choice2]", "Option2");
        await delay(1000);
        //Them option (neu muon)
        // const addChoice = await page.$('div[aria-label="Add a choice"]');
        // await addChoice.click()
        // await delay(1000);
        // await page.type("input[name=Choice3]", "Option3");

        // Setup time poll
        // const addChoice = await page.$('select[data-testid="selectPollDays"]');
        // await addChoice.click()
      } catch (error) {
        console.log("Khong the tao poll");
      }
    }

    const clickPost_0 = await page.$(
      'div[data-testid="tweetButtonInline"] > div[dir="ltr"]'
    );
    const clickPost_1 = await page.$(
      'div[data-testid="tweetButton"] > div[dir="ltr"]'
    );
    if (clickPost_0) {
      await delay(1000);
      await clickPost_0.click();
      await delay(3000);
      console.log("Dang status thanh cong");
    } else {
      await delay(1000);
      await clickPost_1.click();
      console.log("Dang status thanh cong");
    }
  } catch (error) {
    console.log("Tinh nang dang status khong thuc hien duoc.");
  }
}
