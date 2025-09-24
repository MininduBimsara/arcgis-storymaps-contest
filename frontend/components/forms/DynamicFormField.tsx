// components/forms/DynamicFormField.tsx
import React from "react";
import { AlertCircle } from "lucide-react";
import { FormField, FormErrors } from "@/types/submission";

interface DynamicFormFieldProps {
  field: FormField;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string | null;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const baseClassName = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
    error ? "border-red-500 error-field" : "border-gray-300"
  }`;

  const renderField = () => {
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseClassName}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            rows={field.rows || 3}
            required={field.required}
          />
        );

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseClassName}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required={field.required}
            />
            <div>
              <span className="text-sm font-medium text-gray-900">
                {field.label} {field.required && "*"}
              </span>
              {field.placeholder && (
                <p className="text-sm text-gray-600 mt-1">
                  {field.placeholder}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            value={value || ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseClassName}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            required={field.required}
          />
        );
    }
  };

  if (field.type === "checkbox") {
    return (
      <div>
        {renderField()}
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label} {field.required && "*"}
      </label>
      {renderField()}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
      {field.maxLength && field.type !== "checkbox" && (
        <p className="mt-1 text-sm text-gray-500">
          {String(value || "").length}/{field.maxLength} characters
        </p>
      )}
    </div>
  );
};

export default DynamicFormField;
