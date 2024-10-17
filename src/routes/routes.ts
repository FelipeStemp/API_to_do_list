import express from 'express';
import { createItem_, deleteItemByIdOrName, getAllItens, getItemByIdOrName, getItemByIdUser, updateItemByIdOrName } from '../controller/Methods';

const routes = express.Router();

routes.post('/createItem', createItem_)

routes.get('/', getAllItens)
routes.get('/name/:name', getItemByIdOrName)
routes.get('/id/:id', getItemByIdOrName)
routes.get('/userItens', getItemByIdUser)

routes.put('/updateByID/:id', updateItemByIdOrName)
routes.put('/updateByName/:name', updateItemByIdOrName)

routes.delete('/delete', deleteItemByIdOrName)


export default routes;