import express from "express";
import { register,login,forgotten } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotten",forgotten);

export default router;