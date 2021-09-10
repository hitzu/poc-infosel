import Express from 'express';
import { 
    tranfer,
    deposit,
} from '../controllers/transaction.controller'
import { verifyToken } from "../middlewares/authenticator"
import { validateSchema } from '../middlewares/validate-input-schema';
import { 
    postTransactionTransferRequestSchema, 
    postTransactionDepositRequestSchema, 
} from "../schemas/index"

const api = Express.Router();
api.post("/transfer", verifyToken(), validateSchema(postTransactionTransferRequestSchema, 'body'), tranfer);
api.post("/deposit", verifyToken(), validateSchema(postTransactionDepositRequestSchema, 'body'), deposit);

export default api;
