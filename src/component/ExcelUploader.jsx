import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        console.log("📂 Extracted JSON Data:", jsonData); // Debugging ke liye

        // ✅ Backend par har object ko alag-alag bhejna
        for (const obj of jsonData) {
          const response = await axios.post("http://localhost:5000/api/upload", {
            data: obj, // Har object ko separately bhejna
          });

          console.log("🔄 Server Response for Object:", response.data);

          if (response.status === 200) {
            // alert("✅ Data uploaded successfully!");
          } else {
            alert("❌ Failed to upload data: " + response.data.message);
          }
        }
      } catch (error) {
        console.error("🚨 Upload Error:", error);
        alert("❌ Error uploading file!");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2">
        Upload
      </button>
    </div>
  );
};

export default ExcelUploader;
