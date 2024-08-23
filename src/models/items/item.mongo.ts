import { Document, Schema, model, Model } from "mongoose";


export interface ItemType extends Document {
  categoryId: Schema.Types.ObjectId;
  name: string;
  description: string[];
  imageUrl?: string;
  price: number;
  tiktokLink?: string;
}

const itemSchema: Schema<ItemType> = new Schema<ItemType>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category", 
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: [String], 
      required: true,
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    tiktokLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Item: Model<ItemType> = model<ItemType>("Item", itemSchema);
export default Item;