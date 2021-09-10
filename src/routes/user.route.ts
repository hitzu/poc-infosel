import Express from 'express';
import { 
    getUser,
    insertUser,
    updateInfoUser,
    enableDisableUser
} from '../controllers/user.controller'
import { verifyToken } from "../middlewares/authenticator"
import { validateSchema } from '../middlewares/validate-input-schema';
import { 
    getUserResquestSchema, 
    putUserRequestSchema, 
    postUserRequestSchema, 
    enableDisableUserSchema } from "../schemas/index"
const api = Express.Router();

api.get("/:id", validateSchema(getUserResquestSchema, 'params'), getUser);
api.put("/personal-data", verifyToken(), validateSchema(putUserRequestSchema, 'body'), updateInfoUser);
api.post("/", validateSchema(postUserRequestSchema, 'body'), insertUser);
api.put("/enable-disable", validateSchema(enableDisableUserSchema, 'body'), verifyToken(), enableDisableUser)

export default api;