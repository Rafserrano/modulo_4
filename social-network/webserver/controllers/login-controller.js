'use strict';


const bcrypt = require('bcrypt');

const Joi = require('joi');

const mysqlPool = require('../../databases/mysql-pool');



async function validateSchema(payload) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
  }
  return Joi.validate(payload, schema)
}

async function loginAccount(req, res, next) {
  const accountData = req.body;

  try {
    await validateSchema(accountData);
  }
  catch (e) {
    return res.status(400).send(e);
  }

  const connection = await mysqlPool.getConnection();

  // destructuring
  const {
    email,
    password
  } = accountData;
  // const email = accountData.email;
  // const password = accountData.password;
  try {
    // connection.escape
    // const response = await connection.query(`SELECT * FROM users WHERE users.email =  '${email}'`);
    // [ [{ usuario }] , [ .... ]   ]
    const [response] = await connection.query(`SELECT * FROM users WHERE users.email = ${connection.escape(email)}`);

    connection.release();
    if (response.length !== 1) {
      return res.status(401).send("bad mail");
    }
    const user = response[0];
    // console.log(user)
    const passwordDB = user.password;

    // console.log(passwordDB);
    if (await bcrypt.compare(password, passwordDB) === true) {
      return res.status(200).send("success yay")
    }

    return res.status(401).send();
    //console.log("all good");
  } catch (e) {
    if (connection) {
      connection.release();
    }

    return res.status(500).send(e.message);
  }
}

module.exports = loginAccount;
