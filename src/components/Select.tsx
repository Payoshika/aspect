import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  required = false,
  name = "select",
  error,
  label
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value || ''}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-md ${
          error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
        disabled={disabled}
        required={required}
        name={name}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;
