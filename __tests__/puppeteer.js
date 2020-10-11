const fs = require('fs');
const puppeteer = require('puppeteer');

const writeLocation = `${__dirname}/../server/db/markets.test.json`;
let testDB = JSON.parse(fs.readFileSync(writeLocation));

const APP = `http://localhost:${process.env.PORT || 3000}/`;

describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    testDB = [{ location: 'London', cards: 5 }];
    fs.writeFileSync(writeLocation, JSON.stringify(testDB, null, 2));
  });

  afterAll(() => {
    browser.close();
  });

  describe('Initial display', () => {
    it('loads successfully', async () => {
      // We navigate to the page at the beginning of each case so we have a
      // fresh start
      await page.goto(APP);
      await page.waitForSelector('#header');
      const title = await page.$eval('#header', el => el.innerHTML);
      expect(title).toBe('MegaMarket Loyalty Cards');
    });

    it('displays a usable input field for locations', async () => {
      await page.goto(APP);
      await page.waitForSelector('#new-location');
      await page.focus('#new-location');
      await page.keyboard.type('Tallahassee');
      const inputValue = await page.$eval('#new-location', el => el.value);
      expect(inputValue).toBe('Tallahassee');
    });

    // TODO: Finish tests

    it('renders the MarketsDisplay section', async () => {
      await page.goto(APP);
      await page.waitForSelector('.innerbox');
      const innerboxDiv = await page.$('.innerbox');
      expect(innerboxDiv).not.toBe(null);
    });

    it('renders the TotalsDisplay area', async () => {
      await page.goto(APP);
      await page.waitForSelector('.outerBox');
      const outerBoxDiv = await page.$('.outerBox');
      expect(outerBoxDiv).not.toBe(null);
    });
  });

  describe('State interactions', () => {
    it('can add a new market', async () => {
      await page.goto(APP);
      await page.waitForSelector('.marketBox');
      const marketCount = await page.$$('.marketBox');
      await page.waitForSelector('.primary');
      const addMarketBtn = await page.$('.primary');
      // await page.focus('#new-location');
      // await page.keyboard.type('Manhattan');
      await page.type('#new-location', 'Manhattan');
      await addMarketBtn.click();
      const newMarketCount = await page.$$('.marketBox');
      expect(newMarketCount.length).toEqual(marketCount.length + 1);
    });

    it('can add and remove cards', async () => {
      await page.goto(APP);
      await page.waitForSelector('.primary');
      const addMarketBtn = await page.$('.primary');
      // await page.focus('#new-location');
      // await page.keyboard.type('Manhattan');
      await page.type('#new-location', 'Manhattan'); // shorthand for previous two lines
      await addMarketBtn.click();
      // await page.waitForSelector('.marketBox'); // this is not affecting the flow
      // select newly created box and card number
      const market = await page.$('.marketBox');

      // const AllpTagText = await page.evaluate(() => Array.from(document.querySelectorAll('p'), element => element.textContent));
      // const AllpTagText = await market.$$eval('p', texts => texts.map(text => text.textContent));
      // This method runs Array.from(document.querySelectorAll(selector))
      // within the page and passes it as the first argument to pageFunction.
      // console.log('AllpTagText is: ', AllpTagText);
      // expect(AllpTagText[3]).toEqual('Cards: 0');
      // const buttons = await market.$$('button');
      // const plus = buttons[0];
      // const minus = buttons[1];
      // await plus.click();
      // const AllpTagText1 = await market.$$eval('p', texts => texts.map(text => text.textContent));
      // expect(AllpTagText1[3]).toEqual('Cards: 1');
      // await minus.click();
      // const AllpTagText2 = await market.$$eval('p', texts => texts.map(text => text.textContent));
      // expect(AllpTagText2[3]).toEqual('Cards: 0');


      const inner = await market.$$('p');
      const text = await (await inner[2].getProperty('textContent')).jsonValue();
      const cardNum = await parseInt(text.split(' ')[1]);
      // select and click add button
      const buttons = await market.$$('button');
      const plus = buttons[0];
      await plus.click();
      // select new text and number
      let newText = await (await inner[2].getProperty('textContent')).jsonValue();
      let newCardNum = await parseInt(newText.split(' ')[1]);
      // check if the number of cards incremented after click
      expect(newCardNum).toEqual(cardNum + 1);
      // select and click minus button
      const minus = buttons[1];
      await minus.click();
      // select new text and number
      newText = await (await inner[2].getProperty('textContent')).jsonValue();
      newCardNum = await parseInt(newText.split(' ')[1]);
      // check if the number of cards decremented after click
      expect(newCardNum).toEqual(cardNum);
    });

    xit('cannot delete cards from a market with zero cards', async () => {
      await page.goto(APP);
      await page.waitForSelector('.primary');
      const addMarketBtn = await page.$('.primary');
      // new
      await page.type('#new-location', 'Manhattan');
      const title = await page.$eval('#header', el => el.innerHTML);


      await addMarketBtn.click();
      await page.waitForSelector('.marketBox');
      // select newly created box and card number
      const market = await page.$('.marketBox');
      // select and click add button
      const buttons = await market.$$('button');
      const plus = buttons[0];
      await plus.click();
      // select number of cards
      const inner = await market.$$('p');
      let text = await (await inner[2].getProperty('textContent')).jsonValue();
      let cardNum = await parseInt(text.split(' ')[1]);
      // select and click minus button  # of cards + 1 times
      const minus = buttons[1];
      for (let i = 0; i < cardNum + 1; i++) {
        await minus.click();
      }
      // select new text and number
      text = await (await inner[2].getProperty('textContent')).jsonValue();
      cardNum = await parseInt(text.split(' ')[1]);
      // check if the number of cards incremented after click
      expect(cardNum).toEqual(0);
    });
  });

  describe('Server interactions', () => {
    // TODO: You'll need to require in and query the test DB in order to ensure
    // that the right items show up. You may find it's easiest to start each
    // test with a fresh DB.
    it('loads all markets from database on pageload', async () => {
      await page.goto(APP);
      await page.waitForSelector('.allMarkets');
      const market = await page.$('.marketBox');
      const AllpTagText = await market.$$eval('p', texts => texts.map(text => text.textContent));
      expect(AllpTagText[1]).toEqual('Location: London');
      expect(AllpTagText[2]).toEqual('Cards: 5');
    });

    it('maintains synced state after refresh', async () => {
      // First you'll need to make something to sync!
      // add a card
      await page.goto(APP);
      await page.waitForSelector('.allMarkets');
      let market = await page.$('.marketBox');
      // select and click add button
      const buttons = await market.$$('button');
      const plus = buttons[0];
      await plus.click();
      // read from the card
      let AllpTagText = await market.$$eval('p', texts => texts.map(text => text.textContent));
      const before = AllpTagText[2];
      // click sync
      const syncButton = await page.$('.secondary');
      await syncButton.click();
      // reload
      await page.reload();
      market = await page.$('.marketBox');
      // read from the card again
      AllpTagText = await market.$$eval('p', texts => texts.map(text => text.textContent));
      const after = AllpTagText[2];
      // expect them to be equal
      expect(before).toEqual(after);
    });
  });
});
