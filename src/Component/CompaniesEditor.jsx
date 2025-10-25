import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SingleImageUploader from "./SingleImageUpload";
import api from "./api";
import { useSnackbar } from "./Context/SnackbarContext";

export default function CompaniesEditor() {
  const { showSnackbar } = useSnackbar();

  /* ───── state ───── */
  const [companies, setCompanies] = useState([]); // [{name, logo}]
  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  /* ───── Fetch on mount ───── */
  const fetchCompaniesData = async () => {
    const results = await api.get("/companies-section-data");
    const data = results.data.data;

    const formattedServices = data.map((c) => ({
      name: c.name,
      logo: c.logo,
    }));

    setCompanies(formattedServices);
  };
  useEffect(() => {
    fetchCompaniesData();
  }, []);

  const handleAddCompany = async () => {
    if (!companyName || !logoFile) {
      return alert("Company name and logo are required");
    }
    if (companies.length >= 10) {
      return alert("You can only add up to 10 companies.");
    }

    try {
      // 1. Upload the logo
      const fd = new FormData();
      fd.append("image", logoFile);

      const { data } = await api.post("/upload-company-logo", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newCompany = { name: companyName, logo: data.filename };

      // 2. Save company to DB
      await api.post("/companies-section-data", newCompany); // POST instead of PUT

      // 3. Update UI
      setCompanies((prev) => [...prev, newCompany]);
      showSnackbar("Company added!", "success");

      // 4. Clear form
      setCompanyName("");
      setLogoFile(null);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to add company: " + err.message, "error");
    }
  };

  const handleRemove = async (idx) => {
    const companyToRemove = companies[idx];
    try {
      // Call the backend to delete the image
      await api.post("/delete-images", {
        companyName: companyToRemove.name,
        imageName: companyToRemove.logo,
      });

      // Remove from UI after successful deletion
      setCompanies(companies.filter((_, i) => i !== idx));
    } catch (error) {
      console.error("Failed to delete image:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  return (
    <form className="text-black">
      <h2 className="text-2xl font-bold my-4">Companies Worked For</h2>

      {/* input row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="flex-1 border p-2 rounded"
        />
        <SingleImageUploader onImageSelect={setLogoFile} />
        <button
          type="button"
          onClick={handleAddCompany}
          className="bg-violet-300 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* list */}
      {companies.length > 0 && (
        <ul className="flex flex-wrap gap-3 mb-6">
          {companies.map((c, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 bg-violet-300 text-white px-3 py-2 rounded"
            >
              {c.name}
              <IoMdClose
                className="cursor-pointer"
                onClick={() => handleRemove(idx)}
              />
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
