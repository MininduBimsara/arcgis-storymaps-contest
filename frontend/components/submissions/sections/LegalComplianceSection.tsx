// components/submissions/sections/LegalComplianceSection.tsx
import React from "react";
import { CheckCircle } from "lucide-react";
import DynamicFormField from "@/components/forms/DynamicFormField";
import { SubmissionFormData, FormErrors, FormField } from "@/types/submission";

interface LegalComplianceSectionProps {
  formData: SubmissionFormData;
  errors: FormErrors;
  onChange: (field: string, value: any) => void;
}

const LegalComplianceSection: React.FC<LegalComplianceSectionProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const complianceField: FormField = {
    name: "copyrightCompliant",
    label: "Copyright Compliance Confirmation",
    type: "checkbox",
    required: true,
    placeholder:
      "I confirm that all content, data, and materials used in this submission comply with copyright laws and that I have the necessary rights to use them in this competition.",
    validation: (value: boolean) => {
      if (!value) return "Copyright compliance confirmation is required";
      return null;
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center mb-6">
        <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Legal Compliance
        </h2>
      </div>

      <div className="space-y-4">
        <DynamicFormField
          field={complianceField}
          value={formData.copyrightCompliant}
          onChange={onChange}
          error={errors.copyrightCompliant}
        />
      </div>
    </div>
  );
};

export default LegalComplianceSection;
