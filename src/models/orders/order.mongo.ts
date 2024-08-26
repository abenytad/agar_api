import { Document, Schema, model, Model } from "mongoose";

export interface OrderType extends Document {
  orderedBy: Schema.Types.ObjectId;
  orderedItems: Schema.Types.ObjectId[];
  deliverTo: string;
  city: string;
  status: StatusEnum; // Changed to non-optional since it's required
  interactedAdmin?: Schema.Types.ObjectId;
  historyTime: {
    orderedTime: Date;
    updatedTime?: Date;
  };
}

export enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  CANCELLED = "cancelled",
  DELIVERED = "delivered",
}

const orderSchema: Schema<OrderType> = new Schema<OrderType>(
  {
    orderedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderedItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    deliverTo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.PENDING,
    },
    interactedAdmin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    historyTime: {
      orderedTime: {
        type: Date,
        default: Date.now,
        required: true,
      },
      updatedTime: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const Order: Model<OrderType> = model<OrderType>("Order", orderSchema);
export default Order;
