import Express from 'express';
import { logIn,  } from '../controllers/login.controller'
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import {loginResquestSchema} from "../schemas/index"


api.post("/login", validateSchema(loginResquestSchema, 'body'), logIn);

export default api;