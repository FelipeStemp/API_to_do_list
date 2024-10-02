
import express from 'express';
import { createItem, deleteItem, getItemNameID, getItens, updateItem } from '../model/ListMethods';

//Metodo de retorno de criação da api
export const createItem_ = async (Request: express.Request , Response: express.Response)=>{
    try{

        const {name, description} = Request.body;

        if(!name || !description){
            return Response.status(400).json({error: "Name and description are required!"})
        }

        const existItem = await getItemNameID(name.toLowerCase());

        if(existItem){
            return Response.status(409).json({error: "Name already registred"})
        }

        const Item = await createItem({
            name,
            description
        })

        return Response.status(201).json(Item);

    }catch(err){
        return Response.status(500).send(err)
    }
}

//Metodos de get para a api
export const getAllItens = async (Request: express.Request , Response: express.Response)=>{
        try{
            const Itens = await getItens();

            return Response.status(200).json(Itens)

        }catch(err){
            return Response.status(500).send(err)
        }
}

export const getItemByIdOrName = async (Request: express.Request , Response: express.Response)=>{
    try{

        const name = Request.params.name || null;

        const existItem = await getItemNameID(name.toLowerCase());

        if(!existItem){
            return Response.status(404).json({error: "Item not found"})
        }
        return Response.status(200).json(existItem)

    }catch(err){
        return Response.status(500).send(err)
    }
}

//Metodos de update para api
export const updateItemByIdOrName = async (Request: express.Request , Response: express.Response)=>{
    try{
        const id = Request.params.id || null;
        const nameParams = Request.params.name || null;
        const {name, description, completed} = Request.body;

        const existItem = await getItemNameID(name.toLowerCase());

        if(!existItem){
            return Response.status(404).json({error: "Item not found"})
        }

        const Item = await updateItem(nameParams, id, {
            name: name.toLowerCase(),
            description,
            completed
        })

        return Response.status(201).json(Item)

    }catch(err){
        return Response.status(500).send(err)
    }
}

//Metodo delete para api
export const deleteItemByIdOrName = async (Request: express.Request , Response: express.Response)=>{
    try{
        const { name } = Request.body;
        const normalizedName = name.toLowerCase();

        if(!name && !id){
            return Response.status(404).json({error: "Either name or id must be provided"})
        }

        const existItem = await getItemNameID(normalizedName)

        if(!existItem){
            return Response.status(404).json({error: "Item not found"})
        }
        
        await deleteItem(normalizedName, id)

        return Response.status(204).json({item: "Item was deleted"})

    }catch(err){
        return Response.status(500).send(err);
    }
}
