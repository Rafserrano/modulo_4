'use strict';

const express = require('express');
const routers = require('./routers');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());
//const cervezas = [{ name: "plznen urquell", graduacion: 4 }, { name: "estrella", graduacion: 6 }, { name: "heineken", graduacion: 5 }];
const cervezas = [];
app.use((req, res, next) => {
    req.cervezas = cervezas;
    //console.log(cervezas)
    next()
})
app.post("/cervezas", (req, res) => {
    const { name, graduacion } = req.body;
    let newBeer = { name: name, graduacion: graduacion };
    req.cervezas.push(newBeer);
    console.log(req.cervezas);
    res.send(newBeer);
})
app.get("/cervezas", (req, res) => {
    const cervezas = req.cervezas;
    res.send(cervezas);
})
app.get("/cervezas/:name", (req, res) => {
    const { name } = req.params;
    // console.log(req.params);
    const cervezas = req.cervezas;
    // console.log(cervezas[0].name);
    // console.log(name);
    const result = cervezas.filter((cerveza) => {
        if (cerveza.name == name) return true;
    })
    if (result.length === 0) {
        res.status(404).send("No hay cervezas por ese nombre")
    }
    res.send(result);

})

app.delete('/delete/:name', (req, res) => {
    const { name } = req.params;
    const cervezas = req.cervezas;
    cervezas.filter((cerveza, pos) => {
        if (cerveza.name == name) {
            cervezas.splice(pos, 1);
        }
    })
    console.log(cervezas);
    res.send(cervezas)
})

app.listen(3420, () => { console.log("app running on port 3420"); })
