const request = require('supertest');

const server = 'http://localhost:3000';

const fs = require('fs');
const path = require('path');
const testJsonFile = path.resolve(__dirname, '../server/db/markets.test.json');

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/markets', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/markets')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });

      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      it('markets from "DB" json are in body of response', () => {
        const table = JSON.parse(fs.readFileSync(testJsonFile));
        return request(server)
          .get('/markets')
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(table)
          })
      });
    });

    describe('PUT', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .put('/markets')
          .send([{ location: "London", cards: 4 }])
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('responds with the updated market list', () => {
        const newMarket = [{ location: "London", cards: 4 }]

        return request(server)
          .put('/markets')
          .send(newMarket)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).toEqual(newMarket)
          })
      });

      it('responds to invalid request with 400 status and error message in body', () => {
        const newMarket = [{ location: 123 }]

        return request(server)
          .put('/markets')
          .send(newMarket)
          .expect(400)
          .then(response => {
            expect(response.error).not.toBe(null)
          })
      });
    });
  });
});
