import express from 'express';
const cors = require('cors')

const app = express();
app.use(cors())

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import dotenv from 'dotenv';
dotenv.config();

import business_router from './routers/business.router';
import user_router from './routers/user.router';
import photographyPackage_router from './routers/photographyPackage.router';
import orderPackage_router from './routers/orderPackage.router';

app.use(user_router);
app.use(business_router);
app.use(photographyPackage_router);
app.use(orderPackage_router);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
}).on('error', function (err) {
  console.log("Error occurred, server can't start", err);
})
