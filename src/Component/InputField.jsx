import React from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  containerClass,
  required,
}) => {
  return (
    <input
      className={`px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 ${containerClass}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputField;
