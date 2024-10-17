/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from "./Model";


// METODOS GET DO SCHEMA
export const getItens = () => List.find({})

export const getItemNameID = async (name: string | null , id: string | null) =>
    {
        if (name) {
            name = name.toLowerCase()
            return await List.findOne({ name }).exec();
        }
        if(id){
            return await List.findById( id ).exec();
        }
        return null;
} 

export const getItemByUserId = async (userId: string) =>
{
    if(userId){
        return await List.find({userId}).exec();
    }
    return null
}

// METODO POST DO SCHEMA
export const createItem = (values: Record<string, any>) => new List(values)
.save()
.then((list: any) => list.toObject())


// METODO PUT DO SCHEMA
export const updateItem = async (name: string | null, id: string | null, values: Record<string, any>) => 
    {
        if(!name){
            
            return List.findByIdAndUpdate(id, values, {new: true})
        }
        return List.findOneAndUpdate({name: name}, values, {new: true})
}

// METODO DELETE DO SCHEMA
export const deleteItem = (name: string | null , id: string | null) => 
    {
        if(name){
            return List.findOneAndDelete({name}).exec();
        }else if(id)
        {
            return List.findByIdAndDelete(id).exec();
        }
}
