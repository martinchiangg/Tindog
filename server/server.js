const express = require('express');

const app = express();

const path = require('path');

const cors = require('cors');

const apiRouter = require('./routes/api.js');
// const { kMaxLength } = require('buffer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', apiRouter);

// console.log('process.env.NODE_ENV is: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  // console.log('yay');
  // statically serve everything in the build folder on the route '/build'
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // respond with main app serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('server start at 3000!');
});

module.exports = app;
