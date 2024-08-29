/* eslint-disable @typescript-eslint/no-require-imports */
import express from 'express';
const mongoose = require("mongoose");
import routes from "./routes/routes"

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json())

app.use('/', routes)

app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000/")
})