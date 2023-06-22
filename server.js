const express = require('express');
const app = express();
const routes = require ('./routes');
const bodyParser = require('body-parser');
const cors = require('cors')
const { addAbortSignal } = require('stream');
app.use(cors())
app.use("/", express.static('./img'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/" ,routes);



app.listen("3001")