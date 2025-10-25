import React, { useState } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import api from "./api";
import { useEffect } from "react";
import { useSnackbar } from "./Context/SnackbarContext.jsx";

const ServicesEditor = () => {
  const { showSnackbar } = useSnackbar();
  const fetchServicessData = async () => {
    const results = await api.get("/services-section-data");
    const data = results.data.data;

    const formattedServices = data.map((service) => ({
      title: service.title,
      desc: service.description,
    }));

    setServices(formattedServices);
  };
  useEffect(() => {
    fetchServicessData();
  }, []);

  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");

  const handleAddService = () => {
    if (serviceName.trim() !== "" && serviceDesc.trim() !== "") {
      setServices([...services, { title: serviceName, desc: serviceDesc }]);
      setServiceName("");
      setServiceDesc("");
    }
  };

  const handleRemoveservice = (indexToRemove) => {
    setServices(services.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToUpdate = services;

      await api.put("/services-section-data", dataToUpdate);
      showSnackbar("Services section updated!", "success");
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      alert(`Error updating Services Section Data: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-2xl mx-auto mt-10 text-black">
        <h2 className="text-2xl font-bold mb-4">Add Your Services</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Service Title"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={serviceDesc}
            onChange={(e) => setServiceDesc(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="button"
            onClick={() => {
              if (services.length <= 10) {
                handleAddService();
              } else {
                alert("You can only add up to 10 services.");
              }
            }}
            className="bg-violet-300 text-white px-4 py-2 rounded hover:bg-violet-600"
          >
            Add service
          </button>
        </div>

        {services.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Services Added Include:
            </h3>
            <ul className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-violet-300 text-white rounded"
                >
                  {service.title}
                  <button onClick={() => handleRemoveservice(index)}>
                    <IoMdClose className="text-white" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button
          title="Update"
          containerClass={`text-white ${
            services.length > 0
              ? "bg-violet-300 hover:bg-violet-400"
              : "bg-gray-200"
          }`}
          disabled={services.length === 0}
        />
      </div>
    </form>
  );
};

export default ServicesEditor;
