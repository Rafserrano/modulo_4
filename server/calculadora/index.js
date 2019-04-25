'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const sumar = require('./calculadora/sumar');
const restar = require('./calculadora/restar');

const app = express();
const port = 3000;

/**
 * Queremos hacer una ruta usando el objeto de express Router.
 * /v2/calculadora/sumar
 * /v2/calculadora/restar
 */
const miRouter = express.Router();
miRouter.get('/calculadora/suma', (req, res, next) => {
  return res.send('sumar');
});

miRouter.get('/calculadora/resta', function (req, res, next) {
  return res.send('restar');
});

app.use('/v2', miRouter);


app.use(function (req, res, next) {
  const n = Date.now();
  req.now = n;
  res.set('x-initial-time', n);
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res, next) => res.send('Hello World!'));

app.get('/calculadora/suma', function (req, res) {
  // console.log('Headers recibidos', req.headers);
  // console.log('query params recibidos', req.query);

  const {
    n1,
    n2,
  } = req.query;

  const num1 = parseInt(n1, 10);
  const num2 = parseInt(n2, 10);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('n1 and n2 must be numbers');
  }

  const resultado = sumar(num1, num2);

  const respuesta = {
    resultado, // resultado: resultado 
  };

  res.send(respuesta);
});

app.post('/calculadora/resta', (req, res) => {
  const {
    n1,
    n2,
  } = req.body;

  const resultado = n1 - n2;
  const respuesta = {
    result: resultado,
  };
  res.send(respuesta);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
