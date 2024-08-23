import { Document, Schema, model, Model } from "mongoose";
export interface OrderType extends Document {
  orderedBy: Schema.Types.ObjectId;
  orderedItems: Schema.Types.ObjectId[];
  deliverTo: string;
  city: string;
  status: StatusEnum;
  interactedAdmin: Schema.Types.ObjectId;
  historyTime: {
    orderedTime: Date;
    acceptedTime?: Date; // Optional field
    cancelledTime?: Date; // Optional field
    deliveredTime?: Date; // Optional field
  };
}
export enum StatusEnum {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  CANCELLED = "Cancelled",
  DELIVERED = "Delivered",
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
      required: true,
    },
    interactedAdmin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    historyTime: {
      orderedTime: {
        type: Date,
        required: true,
      },
      acceptedTime: {
        type: Date,
      },
      cancelledTime: {
        type: Date,
      },
      deliveredTime: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);


export const Order: Model<OrderType> = model<OrderType>("Order", orderSchema);
