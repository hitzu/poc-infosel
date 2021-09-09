import Express from 'express';
import { getUser, insertUser, updateInfoUser } from '../controllers/user.controller'
import { verifyToken } from "../middlewares/authenticator"
const api = Express.Router();
api.get("/:id", getUser);
api.put("/personal-data", verifyToken(), updateInfoUser);
api.post("/", insertUser);

export default api;