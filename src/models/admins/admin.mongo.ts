import { Document, Schema, model, Model } from 'mongoose';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
export interface AdminType extends Document {
  _id: Types.ObjectId;
  name: string;
  phoneNumber: string;
  password: string;
}

interface AdminModel extends Model<AdminType> {
  login(phoneNumber: number, password: string): Promise<AdminType | null>;
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
adminSchema.pre<AdminType>('save', async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Admin: Model<AdminType> = model<AdminType>('Admin', adminSchema);
export default Admin;
