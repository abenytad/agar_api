import { Document, Schema, model, Model } from "mongoose";


export interface CategoryType extends Document {
  name: string;
  description: string;
  imageUrl?: string;
  items?: Schema.Types.ObjectId[];
}


const categorySchema: Schema<CategoryType> = new Schema<CategoryType>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);


const Category: Model<CategoryType> = model<CategoryType>("Category", categorySchema);
export default Category;
