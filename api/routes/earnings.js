import express from "express";
import { getEarnings } from '../controllers/earningsController.js';

const router = express.Router();

router.get('/', getEarnings);

export default router;