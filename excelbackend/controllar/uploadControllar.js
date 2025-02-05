import ExcelModel from "../model/excelmodel.js"; // Model import karo (agar na kiya ho toh)

// Function to handle individual object upload
export const uploadExcelData = async (req, res) => {
  try {
    const data = req.body.data;  // Har object ko request body se lo

    // Agar data ka array aaya ho toh loop karo har object pe
    if (Array.isArray(data)) {
      for (let obj of data) {
        await ExcelModel.create(obj); // Single object ko insert karo
      }
    } else {
      await ExcelModel.create(data); // Agar single object ho
    }

    res.status(200).json({ message: "Data uploaded successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to upload data", error });
  }
};
