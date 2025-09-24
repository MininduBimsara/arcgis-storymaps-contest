// components/submissions/sections/TeamSection.tsx
import React from "react";
import { Users } from "lucide-react";
import DynamicArrayManager from "@/components/forms/DynamicArrayManager";
import {
  SubmissionFormData,
  FormErrors,
  FormField,
  TeamMember,
} from "@/types/submission";

interface TeamSectionProps {
  formData: SubmissionFormData;
  errors: FormErrors;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: any) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  formData,
  errors,
  onAdd,
  onRemove,
  onChange,
}) => {
  const teamFields: FormField[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Full Name",
      maxLength: 100,
      validation: (value: string) => {
        if (!value?.trim()) return "Name is required";
        return null;
      },
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Email Address",
      validation: (value: string) => {
        if (!value?.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return null;
      },
    },
    {
      name: "role",
      label: "Role/Title",
      type: "text",
      placeholder: "Role/Title",
      maxLength: 50,
    },
  ];

  const emptyTeamMember: TeamMember = { name: "", email: "", role: "" };

  return (
    <DynamicArrayManager
      title="Team Information"
      items={formData.teamMembers}
      fields={teamFields}
      maxItems={10}
      emptyItem={emptyTeamMember}
      errors={errors}
      onAdd={onAdd}
      onRemove={onRemove}
      onChange={onChange}
      getItemTitle={(index) => `Team Member ${index + 1}`}
      icon={<Users className="w-6 h-6 mr-3" />}
      iconColor="text-indigo-600"
    />
  );
};

export { TeamSection };