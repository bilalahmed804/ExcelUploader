import mongoose from "mongoose";

// Schema definition for Excel data
const excelSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Phone: Number,
  Age: Number,
}, { timestamps: true });

const ExcelModel = mongoose.model("ExcelData", excelSchema);

export default ExcelModel;
