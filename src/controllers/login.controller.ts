import { Request, Response } from 'express';
import UserModel from '../models/user/user.model';
import { generate } from '../services/token';
import { loginResponseSchema } from '../schemas';
import { validate } from '../services/validation';

const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userFound = await UserModel.findOne({
      username: username,
      password: password,
      status: true
    });
    if (!userFound) {
      throw new Error('user not found');
    } else {
      const userWithPerson = await UserModel.findByIdLean(userFound._id);
      const token = await generate(
        userWithPerson._id,
        userWithPerson.username,
        userWithPerson.status,
        userWithPerson.personId._id,
        req.clientIp
      );
      const finalResponse = { userData: userWithPerson, token: token };
      await validate(finalResponse, loginResponseSchema);
      res.status(200).send(finalResponse);
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: error.message });
  }
};

export { logIn };
