import Express from 'express';
import { getUser, insertUser, updateInfoUser } from '../controllers/user.controller'
const api = Express.Router();
api.get("/:id", getUser);
api.put("/personal-data", updateInfoUser);
api.post("/", insertUser);

export default api;