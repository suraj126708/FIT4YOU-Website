import React from "react";

const InputField = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  options,
  accept,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          className="mt-1 p-2 border bg-gray-100 border-slate-800 rounded-md w-full"
          value={value}
          onChange={onChange}
        >
          <option value="">Select {label}</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      ) : type === "file" ? (
        <input
          type={type}
          id={id}
          name={name}
          className="mt-1 p-2 border bg-gray-100 border-slate-800 rounded-md w-full"
          onChange={onChange}
          accept={accept}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="mt-1 p-2 border bg-transparent border-slate-800 rounded-md w-full"
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
