import productModel from "../models/product.js";
import { ErrorResponse } from "../utils/errorResponse.js";

const getProducts = async (req, res, next) => {
  res.json(res.paginated);
};

const searchProducts = async (req, res, next) => {
  try {
    const { title } = req.query;
    const product = await productModel.find({
      title: { $regex: title, $options: "$i" },
    });

    if (!product) throw new ErrorResponse("No product found!");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await productModel.findById({ _id: id });
    if (!product) throw new ErrorResponse("No product found!");
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const getProductsByCategorie = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const {
    params: { categorie },
  } = req;
  const productCount = await productModel.countDocuments({
    categorie: { $regex: categorie, $options: "$i" },
  });
  console.log(productCount);
  const totalPages = Math.ceil(productCount / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  console.log(startIndex, endIndex);

  const results = {};

  if (endIndex < (await productModel.countDocuments().exec()))
    results.next = {
      page: page,
      limit,
    };
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }
  results.totalPages = totalPages;
  try {
    results.results = await productModel
      .find({
        categorie: { $regex: categorie, $options: "$i" },
      })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.paginated = results;
    if (!results.results) throw new ErrorResponse("No product found!");
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getRandomProducts = async (req, res, next) => {
  try {
    const products = await productModel.aggregate([{ $sample: { size: 2 } }]);
    if (!products) throw new ErrorResponse("No products found!");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  try {
    if (!req.file) throw new ErrorResponse("Please upload a file!");
    const {
      body: { title, description, price, categorie },
      file: { publicUrl },
    } = req;
    const product = await productModel.create({
      title,
      description,
      imgUrl: publicUrl,
      price,
      categorie,
    });
    res.send("New product got created");
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = await productModel.findOneAndUpdate(id, body);
    res.send("The product got updated");
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const {
      body: { id },
    } = req;
    const product = await productModel.deleteOne({ _id: id });
    res.send("Product got deleted");
  } catch (error) {
    next(error);
  }
};

export {
  getRandomProducts,
  getProducts,
  getProductsByCategorie,
  searchProducts,
  getProductById,
  postProduct,
  deleteProduct,
  updateProduct,
};
