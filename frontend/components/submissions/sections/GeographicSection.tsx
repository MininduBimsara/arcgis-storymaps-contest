// components/submissions/sections/GeographicSection.tsx
import React from "react";
import { MapPin } from "lucide-react";
import DynamicFormField from "@/components/forms/DynamicFormField";
import {
  SubmissionFormData,
  FormErrors,
  FormField,
  Region,
} from "@/types/submission";

interface GeographicSectionProps {
  formData: SubmissionFormData;
  errors: FormErrors;
  onChange: (field: string, value: any) => void;
}

const GeographicSection: React.FC<GeographicSectionProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const regions: Region[] = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Asia",
    "Oceania",
    "Global",
  ];

  const fields: FormField[] = [
    {
      name: "region",
      label: "Region",
      type: "select",
      required: true,
      options: regions.map((region) => ({ value: region, label: region })),
      validation: (value: string) => {
        if (!value) return "Region is required";
        return null;
      },
    },
    {
      name: "specificLocation",
      label: "Specific Location (Optional)",
      type: "text",
      placeholder: "e.g., Colombo, Western Province",
      maxLength: 100,
    },
  ];

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <MapPin className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-light text-black">
          Geographic Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <DynamicFormField
            key={field.name}
            field={field}
            value={formData[field.name as keyof SubmissionFormData]}
            onChange={onChange}
            error={errors[field.name]}
          />
        ))}
      </div>
    </div>
  );
};

export default GeographicSection;
