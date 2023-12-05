import Hidemyacc from "./hidemyacc.js";
import puppeteer from "puppeteer-core";
// import featureAutoScroll from "./feature/featureAutoScrollX.js";
// import featureLikeX from "./feature/featureLikeX.js";
// import featureSavePostsX from "./feature/featureSavePostsX.js";
import featureUnfollowingX from "./feature/featureUnfollowingX.js";
// import featureInboxX from "./feature/featureInboxX.js";
// import featureReadNotiX from "./feature/featureReadNotiX.js";
// import featureShareNotTitleX from "./feature/featureShareX.js";
// import featureCommentX from "./feature/featureCommentX.js";
// import featureShareX from "./feature/featureShareX.js";
let logErrors = [];
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

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
    const results = await account.map(async profile => {
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

      await delay(3000);
      // await featureAutoScroll(page, 1);
      // await featureSavePostsX(page, 4, 0, 3, logErrors);
      await featureUnfollowingX(page, logErrors);
      // await featureLikeX(page, 5, 0, 4, logErrors);
      // await featureCommentX(page, 4, 0, 3);
      // await featureShareX(page, 4, 0, 4);
      // await featureShareNotTitleX(page, 4, 0, 3);
      // await featurePostStatus(page, {
      //   status: 'div[aria-label="Everyone can reply"]',
      //   image: 'div[aria-label="Add photos or video"]',
      //   //gif: 'div[aria-label="Add a GIF"]',
      //   // emoji: 'div[aria-label="Add emoji"]',
      //   //poll: 'div[aria-label="Add poll"]',
      //   // schedule: 'div[aria-label="Schedule post"]'
      // });
      // await featureInboxX(page);
      // await featureReadNotiX(page, logErrors);
      // return logErrors;
      // await browser.close();
      console.log(logErrors);
    });

    //run cac tai khoan cung 1 luc
    const openProfiles = await Promise.all(results);
  } catch (error) {
    console.error("Loi khong chay duoc profiles", error);
  }
}
