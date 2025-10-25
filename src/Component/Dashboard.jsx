import React, { useState } from "react";
import Sidebar from "./AdminSideBar";
import HomeSectionEditior from "./HomeSectionEditior";
import AboutEditior from "./AboutEditor";
import SkillEditor from "./SkillEditor";
import ServicesEditor from "./ServicesEditor";
import CompaniesEditor from "./CompaniesEditor";

const Content = ({ section }) => {
  switch (section) {
    case "home":
      return <HomeSectionEditior />;
    case "about":
      return <AboutEditior />;
    case "skills":
      return <SkillEditor />;
    case "services":
      return <ServicesEditor />;
    case "companies_worked":
      return <CompaniesEditor />;
    default:
      return (
        <h2 className="text-black text-2xl">Welcome to Admin Dashboard</h2>
      );
  }
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelect={setActiveSection} />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Content section={activeSection} />
      </main>
    </div>
  );
};

export default AdminDashboard;
