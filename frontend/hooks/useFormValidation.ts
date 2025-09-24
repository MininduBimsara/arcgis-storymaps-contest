// hooks/useFormValidation.ts
import { useState } from "react";
import { SubmissionFormData, FormErrors } from "@/types/submission";

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: SubmissionFormData): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim() || formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    // Description validation
    if (!formData.description.trim() || formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    // StoryMap URL validation
    if (!formData.storyMapUrl.trim()) {
      newErrors.storyMapUrl = "StoryMap URL is required";
    } else if (
      !/^https:\/\/(arcg\.is\/[a-zA-Z0-9]+|storymaps\.arcgis\.com\/stories\/[a-zA-Z0-9]+)$/i.test(
        formData.storyMapUrl
      )
    ) {
      newErrors.storyMapUrl = "Please provide a valid ArcGIS StoryMaps URL";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    // Region validation
    if (!formData.region) {
      newErrors.region = "Region is required";
    }

    // Copyright compliance validation
    if (!formData.copyrightCompliant) {
      newErrors.copyrightCompliant =
        "Copyright compliance confirmation is required";
    }

    // Team members validation
    formData.teamMembers.forEach((member, index) => {
      if (member.name || member.email || member.role) {
        if (!member.name) {
          newErrors[`teamMember_${index}_name`] = "Name is required";
        }
        if (!member.email) {
          newErrors[`teamMember_${index}_email`] = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
          newErrors[`teamMember_${index}_email`] = "Invalid email format";
        }
      }
    });

    // Data sources validation
    formData.dataSourcesUsed.forEach((source, index) => {
      if (source.name || source.url || source.type) {
        if (!source.name) {
          newErrors[`dataSource_${index}_name`] = "Name is required";
        }
        if (!source.type) {
          newErrors[`dataSource_${index}_type`] = "Type is required";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const setError = (field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateForm,
    clearError,
    setError,
    clearAllErrors,
    setErrors,
  };
};
