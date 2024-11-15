import React from 'react';

function LabeledInput({ id, label, type = 'text', value, onChange, className, required = false }) {
  return (
    <div className={`relative grid ${className}`}>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-base text-gray-900 bg-white border border-gray-400 rounded-sm outline-none"
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-2 text-gray-600 bg-white px-1 text-sm"
      >
        {label}
      </label>
    </div>
  );
}

export default LabeledInput;
