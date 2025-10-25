import React, { useState } from "react";
import Button from "./Button";
import { IoMdClose } from "react-icons/io";
import { useSnackbar } from "./Context/SnackbarContext.jsx";
import { useEffect } from "react";
import api from "./api.jsx";

const SkillEditor = () => {
  const { showSnackbar } = useSnackbar();

  const fetchSkillsData = async () => {
    const results = await api.get("/skills-section-data");
    const data = results.data.data;

    const formattedSkills = data.map((skill) => ({
      name: skill.name,
      level: skill.level,
    }));

    setSkills(formattedSkills);
  };
  useEffect(() => {
    fetchSkillsData();
  }, []);

  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [skillPercentage, setSkillPercentage] = useState("");

  const handleAddSkill = () => {
    if (
      skillName.trim() !== "" &&
      skillPercentage >= 0 &&
      skillPercentage <= 100
    ) {
      setSkills([...skills, { name: skillName, level: skillPercentage }]);
      setSkillName("");
      setSkillPercentage("");
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToUpdate = skills;

      await api.put("/skills-section-data", dataToUpdate);
      showSnackbar("Skills section updated!", "success");
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      alert(`Error updating Skills Section Data: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-2xl mx-auto mt-10 text-black">
        <h2 className="text-2xl font-bold mb-4">Add Your Skills</h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Skill (e.g. React)"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Proficiency %"
            value={skillPercentage}
            min={0}
            max={100}
            onChange={(e) => setSkillPercentage(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="button"
            onClick={() => {
              if (skills.length < 10) {
                handleAddSkill();
              } else {
                alert("You can only add up to 10 skills.");
              }
            }}
            className="bg-violet-300 text-white px-4 py-2 rounded hover:bg-violet-600"
          >
            Add Skill
          </button>
        </div>

        {skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Skills Added</h3>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-violet-300 text-white rounded"
                >
                  {skill.name} - {skill.level}%
                  <button onClick={() => handleRemoveSkill(index)}>
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
            skills.length > 0
              ? "bg-violet-300 hover:bg-violet-400"
              : "bg-gray-200"
          }`}
          disabled={skills.length === 0}
        />
      </div>
    </form>
  );
};

export default SkillEditor;
