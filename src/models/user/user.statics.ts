import { IUserDocument } from "./user.types";
import { Types } from 'mongoose';

export async function findByIdLean(
  userId: string
): Promise<IUserDocument> {
  try { 
    return await this.findById(Types.ObjectId(userId))
    .populate({
      path: 'personId',
      options: { lean: true}
    }).lean();
  } catch (err) {
    throw new Error(err)
  }
}
