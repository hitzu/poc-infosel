import { Request, Response } from 'express';
import { RequestCustom } from "../interfaces/start-options.interface"
import PersonModel from "../models/person/person.model";
import UserModel from "../models/user/user.model";
import AccountModel from "../models/account/account.model";
import {IPerson} from "../models/person/person.types";
import {IUser} from "../models/user/user.types";
import {IAccount, IAccountDocument} from "../models/account/account.types";


const getUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        res.status(200).send(await UserModel.findByIdLean(req.params.id));
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const insertUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const person : IPerson = {...req.body.person};
        PersonModel.create(person, (error, personCreated) => {
            if (error) {
                res.status(500).send({error:error.message})
            } else {
                const user : IUser = {
                    ...req.body.user,
                    personId: personCreated._id,
                }
                UserModel.create(user, async (error, userCreated) => {
                    console.log(error);
                    if (error) {
                        console.log('se aprovecha los callbacks para hacer rollback', personCreated);
                        await PersonModel.findOneAndRemove({_id : personCreated._id})
                        res.status(500).send({error:error.message})
                    } else {
                        console.log('entro aunque haya fallado?');
                        const account: IAccountDocument = {...req.body.acount};
                        account.account_number = (await AccountModel.find({})).length + 1;
                        account.personId = personCreated._id
                        AccountModel.create(account, async (error, accountCreated) => {
                            if (error) {
                                console.log('se aprovecha los callbacks para hacer rollback');
                                await PersonModel.findOneAndRemove({_id : personCreated._id})
                                await UserModel.findOneAndRemove({_id :userCreated._id})
                                res.status(500).send({error:error.message})
                            } else {
                                res.status(200).send(await UserModel.findByIdLean(userCreated._id));
                            }
                        })
                           
                    }
                })
            }
        });
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const updateInfoUser = async (req: RequestCustom, res: Response) : Promise<void> => {
    try {
        const {person_id} = req.thor
        const {phone, address} = req.body.person;
        const personCreated = await PersonModel.findByIdAndUpdate(person_id, {$set:{phone, address}}, {new: true});
        if (!personCreated) {
            res.status(500).send({error: 'person not found'});
        } else {
            const userFound = await UserModel.findOne({personId : personCreated._id})
            res.status(200).send(await UserModel.findByIdLean(userFound._id));
        }
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

export {
    getUser,
    insertUser,
    updateInfoUser
}