import { Request, Response } from 'express';
import PersonModel from "../models/person/person.model";
import UserModel from "../models/user/user.model";
import {IPerson} from "../models/person/person.types";
import {IUser} from "../models/user/user.types";


const getUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        res.status(200).send(await UserModel.findByIdLean(req.params.id));
    } catch (error) {
        console.log(error);
        res.status(500).send({hola : error});
    }
}

const insertUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const person : IPerson = {...req.body.person};
        const personCreated = await PersonModel.create(person);
        const user : IUser = {
            ...req.body.user,
            personId: personCreated.id,
        }
        const UserCreated = await new UserModel(user).save();
        console.log(UserCreated);
        res.status(200).send(await UserModel.findByIdLean(UserCreated._id));
    } catch (error) {
        res.status(500).send({hola : error});
    }
}

const updateInfoUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const {person_id, phone, address} = req.body.person;
        const personCreated = await PersonModel.findByIdAndUpdate(person_id, {$set:{phone, address}}, {new: true});
        if (!personCreated) {
            res.status(500).send({error: 'person not found'});
        } else {
            const userFound = await UserModel.findOne({personId : personCreated._id})
            console.log(userFound._id);
            res.status(200).send(await UserModel.findByIdLean(userFound._id));
        }
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({hola : error});
    }
}

export {
    getUser,
    insertUser,
    updateInfoUser
}