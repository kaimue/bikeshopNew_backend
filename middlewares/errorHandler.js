import { application } from "express";

export const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(res.statusCode).json({ error: error.message });
};
