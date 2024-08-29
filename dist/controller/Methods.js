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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemByIdOrName = exports.updateItemByIdOrName = exports.getItemByIdOrName = exports.getAllItens = exports.createItem_ = void 0;
const ListMethods_1 = require("../model/ListMethods");
//Metodo de retorno de criação da api
const createItem_ = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = Request.body;
        if (!name || !description) {
            return Response.status(400).json({ error: "Name and description are required!" });
        }
        const existItem = yield (0, ListMethods_1.getItemNameID)(name.toLowerCase(), null);
        if (existItem) {
            return Response.status(409).json({ error: "Name already registred" });
        }
        const Item = yield (0, ListMethods_1.createItem)({
            name: name.toLowerCase(),
            description
        });
        return Response.status(201).json(Item);
    }
    catch (err) {
        return Response.status(500).send(err);
    }
});
exports.createItem_ = createItem_;
//Metodos de get para a api
const getAllItens = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Itens = yield (0, ListMethods_1.getItens)();
        return Response.status(200).json(Itens);
    }
    catch (err) {
        return Response.status(500).send(err);
    }
});
exports.getAllItens = getAllItens;
const getItemByIdOrName = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id || null;
        const name = Request.params.name || null;
        const existItem = yield (0, ListMethods_1.getItemNameID)(name ? name.toLowerCase() : null, id);
        if (!existItem) {
            return Response.status(404).json({ error: "Item not found" });
        }
        return Response.status(200).json(existItem);
    }
    catch (err) {
        return Response.status(500).send(err);
    }
});
exports.getItemByIdOrName = getItemByIdOrName;
//Metodos de update para api
const updateItemByIdOrName = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id || null;
        const nameParams = Request.params.name || null;
        const { name, description, completed } = Request.body;
        const existItem = yield (0, ListMethods_1.getItemNameID)(nameParams ? nameParams.toLowerCase() : null, id);
        if (!existItem) {
            return Response.status(404).json({ error: "Item not found" });
        }
        const Item = yield (0, ListMethods_1.updateItem)(nameParams, id, {
            name,
            description,
            completed
        });
        return Response.status(201).json(Item);
    }
    catch (err) {
        return Response.status(500).send(err);
    }
});
exports.updateItemByIdOrName = updateItemByIdOrName;
//Metodo delete para api
const deleteItemByIdOrName = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, id } = Request.body;
        const normalizedName = name ? name.toLowerCase() : null;
        if (!name && !id) {
            return Response.status(404).json({ error: "Either name or id must be provided" });
        }
        const existItem = yield (0, ListMethods_1.getItemNameID)(normalizedName, id);
        if (!existItem) {
            return Response.status(404).json({ error: "Item not found" });
        }
        yield (0, ListMethods_1.deleteItem)(normalizedName, id);
        return Response.status(204).json({ item: "Item was deleted" });
    }
    catch (err) {
        return Response.status(500).send(err);
    }
});
exports.deleteItemByIdOrName = deleteItemByIdOrName;
