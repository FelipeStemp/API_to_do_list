"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Methods_1 = require("../controller/Methods");
const routes = express_1.default.Router();
routes.post('/createItem', Methods_1.createItem_);
routes.get('/', Methods_1.getAllItens);
routes.get('/name/:name', Methods_1.getItemByIdOrName);
routes.get('/id/:id', Methods_1.getItemByIdOrName);
routes.put('/updateByID/:id', Methods_1.updateItemByIdOrName);
routes.put('/updateByName/:name', Methods_1.updateItemByIdOrName);
routes.delete('/delete', Methods_1.deleteItemByIdOrName);
exports.default = routes;
