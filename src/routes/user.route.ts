import Express from 'express';
import { getUser } from '../controllers/user.controller'
const api = Express.Router();
api.get("/", getUser);

export default api;