import express from "express";
import { login, signup, getUserById } from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.put("/makeadmin", verifyToken, (req, res, next) => {
  console.log(req.user);
});

router.get("/:id", verifyToken, getUserById);

export default router;
