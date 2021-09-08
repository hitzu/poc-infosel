import { Request, Response } from 'express';
import PersonModel from "../models/person/person.model";
import {IPerson} from "../models/person/person.types"


const getUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        res.status(200).send(await PersonModel.findByIdLean(req.params.id));
    } catch (error) {
        console.log(error);
        res.status(500).send({hola : error});
    }
}

const insertUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const person : IPerson = {...req.body.person};
        const personCreated = await PersonModel.create(person);
        // const personCreated = await PersonSchema.create(person);
        // const user : UserDocument = {
        //     ...req.body.user,
        //     personId: personCreated.id,
        // }
        
        // const UserCreated = await new UserSchema(user).save();
        
        res.status(200).send({personSaved : personCreated});
    } catch (error) {
        res.status(500).send({hola : error});
    }
}

export {
    getUser,
    insertUser
}