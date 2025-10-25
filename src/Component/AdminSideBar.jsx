import React, { useState } from "react";
import { FaBars, FaHome, FaUser, FaCog, FaTools } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ handleLogout, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <FaHome />, label: "Edit Home", key: "home" },
    { icon: <FaUser />, label: "Edit About", key: "about" },
    { icon: <FaTools />, label: "Edit Skills", key: "skills" },
    { icon: <FaCog />, label: "Edit Services", key: "services" },
    {
      icon: <GoOrganization />,
      label: "Edit Companies Worked",
      key: "companies_worked",
    },
    { icon: <FiLogOut />, label: "Log Out", key: "logOut" },
  ];

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-64" : "w-16"
      } transition-all bg-gray-900 text-white shadow-lg flex flex-col`}
    >
      <button onClick={toggleSidebar} className="p-4 focus:outline-none">
        <FaBars />
      </button>
      <nav className="flex flex-col gap-4 p-4">
        {menuItems.map(({ icon, label, key }) => (
          <button
            key={key}
            onClick={() => {
              onSelect(key);
              if (key === "logOut") handleLogout();
            }}
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded"
          >
            {icon}
            {isOpen && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
