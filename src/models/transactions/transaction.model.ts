import { model } from "mongoose";
import { ITransactionDocument, ITransactionModel } from "./transaction.types";
import transactionSchema from "./transaction.schema"

export default model<ITransactionDocument>("transaction", transactionSchema) as ITransactionModel;