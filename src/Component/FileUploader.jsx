import React, { useState } from "react";

function FileUploader({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      onFileSelect(selectedFile);
      setFile(selectedFile);
    } else {
      alert("Only PDF or DOCX files are allowed.");
      e.target.value = null;
      onFileSelect(null);
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full my-3">
      <p>Upload Your CV</p>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="mb-3"
        required
      />
      {file && <p className="mb-3">Selected File: {file.name}</p>}
    </div>
  );
}

export default FileUploader;
