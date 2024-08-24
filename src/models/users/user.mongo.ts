import { Document, Schema, model, Model } from 'mongoose';
import { Types } from 'mongoose';
export interface UserType extends Document {
    _id: Types.ObjectId;
    name: string;
    phoneNumber: string;
}
interface UserModel extends Model<UserType> {
    login(phoneNumber: number, password: string): Promise<UserType | null>;
}

const userSchema:Schema<UserType>=new Schema<UserType>(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const User: UserModel = model<UserType, UserModel>('User', userSchema);
export default User;