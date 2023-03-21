// main server file for the application
const  express = require('express')
const mongoose = require("mongoose");
require("dotenv").config();
const dbConfig = require("./src/config/db");
const company_route = require('./src/route/company-route')

mongoose.Promise = global.Promise;

const app = express()
app.use(express.json())

// user routes for the application
app.use("",company_route);

// app running port on local
const port = process.env.PORT ||3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(` app listening on port ${port}!`))