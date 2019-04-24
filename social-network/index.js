'use strict';

//require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const accountRouter = require('./webserver/routes/account-router');
const mysqlPool = require('./databases/mysql-pool');
//const loginRouter = require('./webserver/routes/login-router');

const app = express();
app.use(bodyParser.json());

app.use('/api', accountRouter);
//app.use('/api', loginRouter)
async function init() {
  try {
    await mysqlPool.connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
  });
}

init();
