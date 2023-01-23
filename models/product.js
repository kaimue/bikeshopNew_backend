import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imgUrl: String,
  categorie: String,
  createdAt: { type: Date, default: Date.now },
});

const productModel = model("Product", productSchema);

export default productModel;
