import mongoose from "mongoose";

const connection = `${process.env.URL}`;

mongoose.connect(connection);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to Mongoose."));

export default db;
