"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-require-imports */
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const routes_1 = __importDefault(require("./routes/routes"));
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
