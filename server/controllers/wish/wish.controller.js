const puppeteer = require("puppeteer");
const { WishModel, StoreModel, AccountModel } = require("../../models");

const fs = require("fs");
const https = require("https");

const download = (url, destination) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(resolve(true));
        });
      })
      .on("error", (error) => {
        fs.unlink(destination);

        reject(error.message);
      });
  });

module.exports = {
  create: async (req, res) => {
    const content = req.value.body;
    content.createdAt = Date.now();
    content.modifiedAt = Date.now();
    const store = await StoreModel.findOne({ origin: content.origin }, { name: 1, origin: 1, logo: 1 });
    content.store = store._id;
    content.createdBy = req.decoded.user;
    content.modifiedBy = req.decoded.user;
    const objToSave = new WishModel(content);
    let savedObj = await objToSave.save();
    savedObj.store = store;
    res.status(200).send(savedObj);
  },
  list: async (req, res) => {
    const arr = await WishModel.find({ createdBy: req.decoded.user }, { modifiedBy: 0, createdBy: 0, __v: 0 }).populate("store", "-_id name origin logo", "store").sort("-modifiedAt");
    res.status(200).send(arr);
  },
  listForUser: async (req, res) => {
    const { id } = req.value.body;
    const user = await AccountModel.findOne({ username: id ? id.toLowerCase() : "" });
    if (!user) {
      return res.status(403).json({ status: 403, message: "User with such username does not exist." });
    }
    const arr = await WishModel.find({ createdBy: user._id }, { _id: 0, modifiedBy: 0, createdBy: 0, __v: 0 }).populate("store", "-_id name origin logo", "store").sort("-modifiedAt");
    res.status(200).send(arr);
  },
  listAll: async (req, res) => {
    const arr = await WishModel.find();
    res.status(200).send(arr);
  },
  remove: async (req, res) => {
    const { id } = req.value.params;
    await WishModel.findByIdAndRemove(id);
    res.status(200).send({ _id: id });
  },
  update: async (req, res) => {
    const { id } = req.value.params;
    const content = req.value.body;
    content.modifiedBy = req.decoded.user;
    content.modifiedAt = Date.now();
    const objToSave = await WishModel.findByIdAndUpdate(id, content);
    res.status(200).send({ ...objToSave._doc, ...content });
  },
  fetch: async (req, res) => {
    const { url } = req.value.body;
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1920,
        height: 1050,
      },
      devtools: false,
    });

    const page = await browser.newPage();
    await page.goto(url, {
      timeout: 20000,
      waitUntil: ["networkidle0"],
    });

    const urlObject = new URL(url);

    const store = await StoreModel.findOne({ origin: urlObject.origin });
    if (!store) {
      return {
        errorCount: 1,
        message: "Unknown store.",
      };
    }
    let response = await page.evaluate((s) => {
      const replaceNbsps = (str) => {
        var re = new RegExp(String.fromCharCode(160), "g");
        return str.replace(re, " ");
      };

      const separateBySpace = (val) => {
        const [first, last] = val.split(" ");
        return [first, last];
      };

      const parsers = {
        default: (val) => val,
        separateBySpaceAndTakeFirst: (val) => separateBySpace(val)[0],
        separateBySpaceAndTakeLast: (val) => separateBySpace(val)[1],
      };

      const { currentPriceParser, oldPriceParser, currencyParser } = s;

      const parseCurrentPrice = parsers[currentPriceParser] || parsers.default;
      const parseOldPrice = parsers[oldPriceParser] || parsers.default;
      const parseCurrency = parsers[currencyParser] || parsers.default;

      const [cp1, cp2] = s.currentPriceSelector.split("||");

      let currentPriceElement = document.querySelector(cp1);

      if (!currentPriceElement) {
        currentPriceElement = document.querySelector(cp2);
      }

      //

      const [c1, c2] = s.currencySelector.split("||");

      let currencyElement = document.querySelector(c1);

      if (!currencyElement) {
        currencyElement = document.querySelector(c2);
      }

      return {
        errorCount: 0,
        message: null,
        store: {
          name: s.name,
          logo: s.logo,
          origin: s.origin,
        },
        title: replaceNbsps(document.querySelector(s.titleSelector).innerText),
        image: document.querySelector(s.imageSelector).src,
        oldPrice: document.querySelector(s.oldPriceSelector) ? parseOldPrice(replaceNbsps(document.querySelector(s.oldPriceSelector).innerText)) : "",
        currency: parseCurrency(replaceNbsps(currencyElement.innerText)),
        currentPrice: parseCurrentPrice(replaceNbsps(currentPriceElement.innerText)),
      };
    }, store);

    // const imgName = `image-${Date.now()}.png`;
    // downloadResult = await download(response.image, `./server/downloads/${imgName}`);

    // if (downloadResult === true) {
    //   console.log("Success:", imgName, "has been downloaded successfully.");
    // } else {
    //   console.log("Error:", imgName, "was not downloaded.");
    //   console.error(downloadResult);
    // }

    response.url = url;

    // await page.screenshot({ path: "screenshots/tehnomanija.png" });
    // response.img = img;
    await browser.close();

    res.json(response);
  },
};
