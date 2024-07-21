import React from "react";

const TextInput = ({
  type = "text",
  placeholder,
  icon: Icon,
  onChange,
  extraClass = "",
  id,
  required,
}) => {
  return (
    <div
      className={`mt-4 items-center w-full flex flex-row px-3 py-2 border gap-2 sm:gap-4 border-gray-300 rounded-full shadow-sm focus:ring focus:ring-indigo-200 ${extraClass}`}
    >
      {Icon && <Icon className="inline-block text-gray-400" size={20} />}
      <input
        id={id}
        type={type}
        className="focus:outline-none text-sm w-full"
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextInput;
