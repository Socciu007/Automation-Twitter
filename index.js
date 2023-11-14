import Hidemyacc from "./hidemyacc.js";
import puppeteer from "puppeteer-core";
import PublicGoogleSheetsParser from "public-google-sheets-parser";

const hideMyAcc = new Hidemyacc();
const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

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
    const results = await account.map((profile) => {
      return hideMyAcc.start(profile.id, {
        startUrl: "about:blank",
      });
    });

    //run cac tai khoan cung 1 luc
    const responses = await Promise.all(results);

    for (const res of responses) {
      try {
        if (res.code !== 1) {
          throw new Error(`Khong mo duoc trinh duyet port ${res.data.port}`);
        }
        const browser = await puppeteer.connect({
          browserWSEndpoint: res.data.wsUrl,
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

        try {
          await page.goto("https://twitter.com/home", {
            timeout: 30000,
            waitUntil: "networkidle2",
          });
          await delay(1000);

          //await autoScroll(page);
          //await featureLike(page, 0, 4);
          //await featureComment(page, 2);
          // await featureRepost(page, 0, 4);
          await featureRepostAddComment(page, 0, 4);
        } catch (error) {
          console.log("Thoi gian tai qua han.");
        }
      } catch (error) {
        console.error("ERR", error);
      }
    }
  } catch (error) {
    console.error("ERR", error);
  }
}

// Luot newsfeed
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const scrollInterval = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight <= scrollHeight) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 1000);
    });
  });
}

// Tinh nang like
async function featureLike(page, numberLike, maxLike) {
  try {
    const likeElements = await page.$$('div[data-testid="like"]');

    if (likeElements === null) {
      throw new Error("Khong tim thay phan tu like");
    }
    // const elementLikeRandom = likeElements
    //   .sort(() => Math.random() - 0.5)
    //   .slice(0, numberLike);

    // for (const clickLike of elementLikeRandom) {
    //   await clickLike.click();
    //   await delay(1000);
    // }

    if (numberLike < maxLike) {
      const indexRandom = Math.ceil(Math.random() + numberLike / 2);
      await likeElements[indexRandom].click();
      await delay(1000);
      return await featureLike(page, numberLike + 1, maxLike);
    }
  } catch (error) {
    console.log("Tinh nang like khong thuc hien duoc.");
  }
}

// Tinh nang comments
async function featureComment(page, numberComment) {
  try {
    const commentElements = await page.$$('div[data-testid="reply"]');

    if (commentElements === null) {
      throw new Error("Khong tim thay phan tu reply");
    }

    const commentInputElement = commentElements.slice(0, numberComment);

    for (const inputComment of commentInputElement) {
      await inputComment.click();
      await delay(1000);

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
      const replyRandom =
        listReply[Math.floor(Math.random() * listReply.length)];
      console.log(replyRandom);

      if (!page.isClosed()) {
        //Viet comment
        await page.type('div[data-contents="true"]', replyRandom.Comments);
        await delay(1000);
        //Enter
        await page.click('div[data-testid="tweetButton"]');
        await delay(3000);
      }
    }
  } catch (error) {
    console.log("Tinh nang comment khong thuc hien duoc.");
  }
}

// Tinh nang repost
async function featureRepost(page, numberRepost, maxRepost) {
  try {
    const repostElements = await page.$$('div[data-testid="retweet"]');

    if (repostElements === null) {
      throw new Error("Khong tim thay phan tu repost");
    }

    if (numberRepost < maxRepost) {
      const indexRandom = Math.ceil(Math.random() + numberRepost / 2);
      await repostElements[indexRandom].click();
      await delay(1000);
      await page.click('div[data-testid="retweetConfirm"]');
      await delay(3000);
      return await featureRepost(page, numberRepost + 1, maxRepost);
    }
  } catch (error) {
    console.log("Tinh nang repost khong thuc hien duoc.");
  }
}

// Tinh nang repost co comment
async function featureRepostAddComment(page, numberRepost, maxRepost) {
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

    if (numberRepost < maxRepost) {
      const indexRandom = Math.floor(Math.random() + numberRepost);
      await repostElements[indexRandom].click();
      console.log(indexRandom);
      await delay(1000);
      await page.click('a[href="/compose/tweet"]');
      await delay(1000);
      await page.type('div[data-contents="true"]', replyRandom.Comments);
      await page.click('div[data-testid="tweetButton"]');
      await delay(1000);
      return await featureRepostAddComment(page, numberRepost + 1, maxRepost);
    }
  } catch (error) {
    console.log("Tinh nang repost khong thuc hien duoc.");
  }
}
