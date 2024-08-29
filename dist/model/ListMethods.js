"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getItemNameID = exports.getItens = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const Model_1 = require("./Model");
// METODOS GET DO SCHEMA
const getItens = () => Model_1.List.find({});
exports.getItens = getItens;
const getItemNameID = (name, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id && mongoose_1.default.Types.ObjectId.isValid(id)) {
        return yield Model_1.List.findById(id).exec();
    }
    if (name) {
        return yield Model_1.List.findOne({ name: name.toLowerCase() }).exec();
    }
    return null;
});
exports.getItemNameID = getItemNameID;
// METODO POST DO SCHEMA
const createItem = (values) => new Model_1.List(values)
    .save()
    .then((list) => list.toObject());
exports.createItem = createItem;
// METODO PUT DO SCHEMA
const updateItem = (name, id, values) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name) {
        return Model_1.List.findByIdAndUpdate(id, values, { new: true });
    }
    return Model_1.List.findOneAndUpdate({ name: name }, values, { new: true });
});
exports.updateItem = updateItem;
// METODO DELETE DO SCHEMA
const deleteItem = (name, id) => {
    if (!name) {
        return Model_1.List.findByIdAndDelete(id).exec();
    }
    return Model_1.List.findOneAndDelete({ name: name }).exec();
};
exports.deleteItem = deleteItem;
