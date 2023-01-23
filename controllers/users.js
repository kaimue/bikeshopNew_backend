import customerModel from "../models/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/errorResponse.js";

const getUserById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await customerModel.findById({ _id: id });
    if (!user) throw new ErrorResponse("User not found!");
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const found = await customerModel.findOne({ email }).select("+password");
    if (!found) throw new ErrorResponse("Email not found");
    const match = await bcrypt.compare(password, found.password);
    if (!match) throw new ErrorResponse("Password incorrect", 401);
    const token = jwt.sign(
      { id: found._id, email: found.email, isAdmin: found.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const {
      body: { firstName, lastName, address, email, password },
    } = req;
    const found = await customerModel.findOne({ email: email });
    if (found) throw new ErrorResponse("User already exists");
    const hash = await bcrypt.hash(password, 5);
    const customer = await customerModel.create({
      firstName,
      lastName,
      address,
      email,
      password: hash,
    });
    const token = jwt.sign(
      { id: customer._id, email: email, isAdmin: customer.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );
    res.json(token);
  } catch (error) {
    next(error);
  }
};

export { login, signup, getUserById };
