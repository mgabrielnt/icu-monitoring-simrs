// components/form/FormComponents.tsx
import React from "react";

interface SectionProps {
  title: string;
  color: "blue" | "green" | "amber" | "purple" | "red";
  children: React.ReactNode;
}

export function Section({ title, color, children }: SectionProps) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    green: "bg-green-50 border-green-200 text-green-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900",
    red: "bg-red-50 border-red-200 text-red-900",
  };

  return (
    <div className={`rounded-xl p-4 border ${colors[color]}`}>
      <h4 className="font-semibold text-base mb-3">{title}</h4>
      {children}
    </div>
  );
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export function InputField({ label, required, className, ...props }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`
          w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
          transition-colors duration-200
          ${className || ""}
        `}
      />
    </div>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  required?: boolean;
}

export function SelectField({ label, options, required, className, ...props }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className={`
          w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
          transition-colors duration-200
          ${className || ""}
        `}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
}

export function TextAreaField({ label, required, className, ...props }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...props}
        className={`
          w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
          transition-colors duration-200 resize-none
          ${className || ""}
        `}
      />
    </div>
  );
}