import mongoose from "mongoose";
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      street: { type: String, required: true },
      houseNumber: { type: String, required: true },
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const customerModel = model("Customer", customerSchema);

export default customerModel;
