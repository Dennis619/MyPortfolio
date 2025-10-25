import React, { useState } from "react";

function SingleImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      onImageSelect(file); // Pass file to parent if needed
    } else {
      setPreview(null);
      onImageSelect(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full my-3">
      <p>Upload Your Home Section Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded w-full max-w-sm"
        required
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-48 h-48 object-cover rounded shadow"
        />
      )}
    </div>
  );
}

export default SingleImageUploader;
