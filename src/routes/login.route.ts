import Express from 'express';
import { logIn,  } from '../controllers/login.controller'
const api = Express.Router();
api.post("/login", logIn);

export default api;