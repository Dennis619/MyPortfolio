import React, { useEffect, useState } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import SingleImageUploader from "./SingleImageUpload";
import api from "./api.jsx";
import imageCompression from "browser-image-compression";
import FileUploader from "./FileUploader.jsx";
import { useSnackbar } from "./Context/SnackbarContext.jsx";

const HomeSectionEditior = () => {
  const { showSnackbar } = useSnackbar();

  const fetchHomeData = async () => {
    const results = await api.get("/home-section-data");
    const data = results.data.data;

    // Update form fields with fetched data
    setFormData({
      fName: data.f_name || "",
      lName: data.l_name || "",
      facebook: data.facebook || "",
      instagram: data.instagram || "",
      linkedIn: data.linkedin || "",
      github: data.github || "",
      x: data.x || "",
    });

    setSkills(data.skills || []);
  };
  useEffect(() => {
    fetchHomeData();
  }, []);

  //form fields
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    facebook: "",
    instagram: "",
    linkedIn: "",
    github: "",
    x: "",
  });
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sanitizedImageName = image
      ? `home_${image.name.replace(/\s+/g, "_")}`
      : "";
    let sanitizedDocName = file ? `home_${file.name.replace(/\s+/g, "_")}` : "";

    try {
      /* ─── 1.  Build JSON payload for Home section update ─── */
      const dataToUpdate = {
        ...formData,
        skills,
        imageName: sanitizedImageName,
        docName: sanitizedDocName,
      };

      await api.put("/home-section-data", dataToUpdate);

      if (image && file) {
        /* ─── 2.  Compress + rename image ─── */
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressed = await imageCompression(image, options);
        const renamedImage = new File([compressed], sanitizedImageName, {
          type: compressed.type,
        });
        const renamedFile = new File([file], sanitizedDocName, {
          type: file.type,
        });

        /* ─── 3.  Multipart upload (image + doc) ─── */
        const formDataUpload = new FormData();
        formDataUpload.append("image", renamedImage);
        formDataUpload.append("file", renamedFile);

        await api.post("/upload-both", formDataUpload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      showSnackbar("Home section updated!", "success");
      setTimeout(() => window.location.reload(), 1000);
      // Optional: clear state or redirect here
    } catch (err) {
      alert(`Error updating Home Section Data: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  return (
    <form className="text-black" onSubmit={handleSubmit}>
      <h1 className="text-black text-3xl my-5">Edit the Home Section</h1>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="fName"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={formData.fName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lName"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={formData.lName}
          onChange={handleChange}
          required
        />

        <SingleImageUploader onImageSelect={(fileData) => setImage(fileData)} />

        <input
          type="url"
          name="facebook"
          placeholder="FaceBook Link"
          className="w-full p-2 border rounded"
          value={formData.facebook}
          onChange={handleChange}
        />

        <input
          type="url"
          name="instagram"
          placeholder="Instagram Link"
          className="w-full p-2 border rounded"
          value={formData.instagram}
          onChange={handleChange}
        />

        <input
          type="url"
          name="linkedIn"
          placeholder="Linked In Link"
          className="w-full p-2 border rounded"
          value={formData.linkedIn}
          onChange={handleChange}
        />

        <input
          type="url"
          name="github"
          placeholder="Github Link"
          className="w-full p-2 border rounded"
          value={formData.github}
          onChange={handleChange}
        />

        <input
          type="url"
          name="x"
          placeholder="X Link"
          className="w-full p-2 border rounded"
          value={formData.x}
          onChange={handleChange}
        />

        <FileUploader onFileSelect={(fileData) => setFile(fileData)} />

        <input
          type="text"
          name="skills"
          placeholder="Type a role and press Enter"
          className="w-full p-2 border rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim() !== "") {
              e.preventDefault();
              if (!skills.includes(inputValue.trim()) && skills.length <= 5) {
                setSkills([...skills, inputValue.trim()]);
                setInputValue("");
              } else {
                alert("You can only add up to 5 unquie Roles.");
              }
            }
          }}
          required={skills > 0 ? true : false}
        />

        <div className="flex flex-col gap-3 rounded-lg p-5">
          {skills && skills.length > 0 && (
            <>
              <h2 className="font-bold text-lg">Skills Added include:</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Button
                    key={index}
                    title={skill}
                    rightIcon={<IoMdClose />}
                    onClick={() => handleRemoveSkill(index)}
                    containerClass="text-white bg-blue-50"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <Button title="Update" containerClass="text-white bg-violet-300" />
      </div>
    </form>
  );
};

export default HomeSectionEditior;
