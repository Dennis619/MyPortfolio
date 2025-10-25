import React, { useState, useEffect } from "react";
import Button from "./Button";
import { useSnackbar } from "./Context/SnackbarContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "./api.jsx";

const AboutEditior = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const fetchAboutData = async () => {
    const results = await api.get("/about-section-data");
    const data = results.data.data;

    // Update form fields with fetched data
    setFormData({
      about: data.about || "",
    });
  };
  useEffect(() => {
    fetchAboutData();
  }, []);

  //form fields
  const [formData, setFormData] = useState({
    about: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToUpdate = {
        ...formData,
      };

      await api.put("/about-section-data", dataToUpdate);
      showSnackbar("About section updated!", "success");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      alert(`Error updating About Section Data: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <h1 className=" text-3xl my-5">Edit the About Section</h1>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="about"
          placeholder="About Me"
          className="w-full p-2 border rounded"
          value={formData.about}
          onChange={handleChange}
          required
        />

        <Button title="Update" containerClass="text-white bg-violet-300" />
      </div>
    </form>
  );
};

export default AboutEditior;
