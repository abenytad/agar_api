import { Document, Schema, model, Model } from 'mongoose';

export interface AdminType extends Document {
  name: string;
  phoneNumber: string;
  password: string;
}

const adminSchema: Schema<AdminType> = new Schema<AdminType>(
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
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin: Model<AdminType> = model<AdminType>('Admin', adminSchema);

export default Admin;
