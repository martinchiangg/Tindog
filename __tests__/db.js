const fs = require('fs');
const path = require('path');
const db = require('../server/data.js');

const testJsonFile = path.resolve(__dirname, '../server/test.json');

describe('db unit tests', () => {
  beforeAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), () => {
      db.reset();
      done();
    });
  });

  afterAll((done) => {
    fs.writeFile(testJsonFile, JSON.stringify([]), done);
  });

  describe('#sync', () => {
    it('writes a valid marketList to the JSON file', (done) => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];

      const result = db.sync(marketList);
      expect(result).not.toBeInstanceOf(Error);
      const table = JSON.parse(fs.readFileSync(testJsonFile));
      expect(table).toEqual(marketList);
      done();
    });

    it('overwrites previously existing markets', () => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
      db.sync(marketList);
      const newMarketList = [{ location: 'over', cards: 10 }, { location: 'under', cards: 2 }];
      const result = db.sync(newMarketList);
      expect(result).not.toBeInstanceOf(Error);
      const table = JSON.parse(fs.readFileSync(testJsonFile));
      expect(table).toEqual(newMarketList);
    });

    it('returns an error when location and/or cards fields are not provided', () => {
      // location is undefined
      const marketList = [{ cards: 11 }, { location: 'there' }, {}];
      const result = db.sync(marketList);
      expect(result).toBeInstanceOf(Error);
      // cards fields not provided
    });

    it('returns an error when location value is not a string', () => {
      const marketList = [{ location: 123, cards: 11 }, { location: null, cards: 2 }, { location: { this: "shouldn't work" }, cards: 3 }, { location: true, cards: 10 }, { location: undefined, cards: 10 }, { location: [1, 2, 3], cards: 10 }];

      marketList.forEach(m => {
        const result = db.sync([m]);
        expect(result).toBeInstanceOf(Error);
      });
    });

    it('returns an error when cards value is not a number', () => {
      const marketList = [{ location: 'here', cards: true }, { location: 'here', cards: null }, { location: 'here', cards: { hey: 'there' } }, { location: 'here', cards: [1, 2] }, { location: 'here', cards: 'string' }, { location: 'here', cards: undefined }];

      marketList.forEach(m => {
        const result = db.sync([m]);
        expect(result).toBeInstanceOf(Error);
      });
    });
  });

  // Extension TODO: Unit test the #find and #drop functions
  describe('#find', () => {
    it('returns list of all markets from the json file', () => {
      const table = JSON.parse(fs.readFileSync(testJsonFile));
      expect(table).toEqual(db.find());
    });

    it('works if the list of markets is empty', () => {
      fs.writeFile(testJsonFile, JSON.stringify([]), () => {
        expect(db.find()).toEqual([]);
      });
    });
  });

  describe('#drop', () => {
    it('writes an empty array to the json file', () => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
      const result = db.sync(marketList);
      db.drop();
      const afterDrop = db.find();
      expect(afterDrop).toEqual([]);
    });
  });
});
