import { Request, Response } from 'express';
import { RequestCustom } from '../interfaces/start-options.interface';
import PersonModel from '../models/person/person.model';
import UserModel from '../models/user/user.model';
import AccountModel from '../models/account/account.model';
import { IPerson } from '../models/person/person.types';
import { IUser } from '../models/user/user.types';
import { validate } from '../services/validation';
import { IAccountDocument } from '../models/account/account.types';
import { userResponseSchema } from '../schemas';

export const swGetUserFunction = {
  summary: 'nos permite logearnos en la app',
  tags: ['auth'],
  responses: {
    '200': {
      description: 'objeto con la informacion del usuario'
    }
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      require: true
    }
  ]
};
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const finalResponse = await UserModel.findByIdLean(req.params.id);
    await validate(finalResponse, userResponseSchema);
    res.status(200).send(finalResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const insertUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const person: IPerson = { ...req.body.person };
    PersonModel.create(person, (error, personCreated) => {
      if (error) {
        res.status(500).send({ error: error.message });
      } else {
        const user: IUser = {
          ...req.body.user,
          personId: personCreated._id
        };
        UserModel.create(user, async (error, userCreated) => {
          if (error) {
            console.log('se aprovecha los callbacks para hacer rollback');
            await PersonModel.findOneAndRemove({ _id: personCreated._id });
            res.status(500).send({ error: error.message });
          } else {
            const account: IAccountDocument = { ...req.body.acount };
            account.account_number = (await AccountModel.find({})).length + 1;
            account.personId = personCreated._id;
            AccountModel.create(account, async (error, accountCreated) => {
              if (error) {
                console.log('se aprovecha los callbacks para hacer rollback');
                await PersonModel.findOneAndRemove({ _id: personCreated._id });
                await UserModel.findOneAndRemove({ _id: userCreated._id });
                res.status(500).send({ error: error.message });
              } else {
                const finalResponse = await UserModel.findByIdLean(
                  userCreated._id
                );
                await validate(finalResponse, userResponseSchema);
                res.status(200).send(finalResponse);
              }
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateInfoUser = async (
  req: RequestCustom,
  res: Response
): Promise<void> => {
  try {
    const { person_id } = req.thor;
    const { phone, address } = req.body.person;
    const personCreated = await PersonModel.findByIdAndUpdate(
      person_id,
      { $set: { phone, address } },
      { new: true }
    );
    if (!personCreated) {
      res.status(500).send({ error: 'person not found' });
    } else {
      const userFound = await UserModel.findOne({
        personId: personCreated._id
      });
      const finalResponse = await UserModel.findByIdLean(userFound._id);
      await validate(finalResponse, userResponseSchema);
      res.status(200).send(finalResponse);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const enableDisableUser = async (
  req: RequestCustom,
  res: Response
): Promise<void> => {
  try {
    const { user_id } = req.thor;
    const previousValue = await UserModel.findById(user_id);
    const userUpdated = await UserModel.findByIdAndUpdate(user_id, {
      $set: { status: !previousValue.status }
    });
    const finalResponse = await UserModel.findByIdLean(userUpdated._id);
    await validate(finalResponse, userResponseSchema);
    res.status(200).send(finalResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export { getUser, insertUser, updateInfoUser, enableDisableUser };
