import Express from 'express';
import { logIn, swLogInFunction } from '../controllers/login.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import { loginResquestSchema } from '../schemas/index';

export const swLoginRouter = {
  '/auth/login': {
    post: {
      ...swLogInFunction
    }
  }
};

api.post('/login', validateSchema(loginResquestSchema, 'body'), logIn);

export default api;
