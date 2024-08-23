import { Document, Schema, model, Model } from 'mongoose';
export interface UserType extends Document {
    name: string;
    phoneNumber: string;
    orders:string[];
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
        orders: [
            {
                type:String
            }
        ]
    },
    { timestamps: true }
);

const User:Model<UserType>=model<UserType>('User',userSchema);
export default User;