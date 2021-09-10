import { IUserDocument } from "./user.types";
import { Types } from 'mongoose';
import accountModel from "../account/account.model";

export async function findByIdLean(
  userId: string
): Promise<IUserDocument> {
  try { 
    const userWithperson = await this.findById(Types.ObjectId(userId))
    .populate({
      path: 'personId',
      options: { lean: true}
    }).lean();
    userWithperson.accounts = await accountModel.find({personId : userWithperson.personId._id, status: true})
    return userWithperson
  } catch (err) {
    throw new Error(err)
  }
}
