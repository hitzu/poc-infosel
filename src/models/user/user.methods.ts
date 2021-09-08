import { IUserDocument } from "./user.types";

export async function setLastUpdated(this: IUserDocument): Promise<void> {
    const now = new Date();
    if (!this.updatedAt || this.updatedAt < now) {
      this.updatedAt = now;
      await this.save();
    }
  }
