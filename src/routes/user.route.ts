import Express from 'express';
import { getUser, insertUser } from '../controllers/user.controller'
const api = Express.Router();
api.get("/:id", getUser);
api.post("/", insertUser);

export default api;