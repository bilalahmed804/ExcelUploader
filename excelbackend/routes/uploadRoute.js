import express from "express";
import { uploadExcelData } from "../controllar/uploadControllar.js";  // Controller ka import

const router = express.Router();

// POST request route for /upload
router.post("/upload", uploadExcelData);

export default router;
