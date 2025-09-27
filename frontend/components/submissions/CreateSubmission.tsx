// components/submissions/CreateSubmissionForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle,
  Mail,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import apiService, { SubmissionData, Category } from "@/lib/api";
import { useFormValidation } from "@/hooks/useFormValidation";
import { SubmissionFormData, TeamMember, DataSource } from "@/types/submission";

// Import all form sections
import { BasicInfoSection, StoryMapSection } from "./sections/BasicInfoSection";
import CategorizationSection from "./sections/CategorizationSection";
import GeographicSection from "./sections/GeographicSection";
import { TeamSection } from "./sections/TeamSection";
import { DataSourcesSection } from "./sections/DataSourcesSection";
import LegalComplianceSection from "./sections/LegalComplianceSection";

const CreateSubmissionForm: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const {
    errors,
    validateForm,
    clearError,
    setError,
    clearAllErrors,
    setErrors,
  } = useFormValidation();

  const [formData, setFormData] = useState<SubmissionFormData>({
    title: "",
    description: "",
    storyMapUrl: "",
    thumbnailUrl: "",
    previewImages: [],
    category: "",
    tags: [],
    region: "",
    specificLocation: "",
    teamMembers: [{ name: "", email: "", role: "" }],
    dataSourcesUsed: [{ name: "", url: "", type: "" }],
    copyrightCompliant: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await apiService.getActiveCategories();
        if (response.success && response.data?.categories) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    if (isAuthenticated) {
      loadCategories();
    }
  }, [isAuthenticated]);

  // Generic form data handler
  const handleInputChange = (field: string, value: any): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  // Array handlers for team members
  const handleTeamMemberChange = (
    index: number,
    field: string,
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addTeamMember = (): void => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", email: "", role: "" }],
    }));
  };

  const removeTeamMember = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }));
  };

  // Array handlers for data sources
  const handleDataSourceChange = (
    index: number,
    field: string,
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      dataSourcesUsed: prev.dataSourcesUsed.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addDataSource = (): void => {
    setFormData((prev) => ({
      ...prev,
      dataSourcesUsed: [
        ...prev.dataSourcesUsed,
        { name: "", url: "", type: "" },
      ],
    }));
  };

  const removeDataSource = (index: number): void => {
    setFormData((prev) => ({
      ...prev,
      dataSourcesUsed: prev.dataSourcesUsed.filter((_, i) => i !== index),
    }));
  };

  // Tag handlers
  const addTag = (tag: string): void => {
    if (
      tag.trim() &&
      !formData.tags.includes(tag.trim().toLowerCase()) &&
      formData.tags.length < 10
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag.trim().toLowerCase()],
      }));
    }
  };

  const removeTag = (tagToRemove: string): void => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Preview image handlers
  const addPreviewImage = (imageUrl: string): void => {
    if (
      imageUrl &&
      !formData.previewImages.includes(imageUrl) &&
      formData.previewImages.length < 5
    ) {
      setFormData((prev) => ({
        ...prev,
        previewImages: [...prev.previewImages, imageUrl],
      }));
    }
  };

  const removePreviewImage = (imageUrl: string): void => {
    setFormData((prev) => ({
      ...prev,
      previewImages: prev.previewImages.filter((img) => img !== imageUrl),
    }));
  };

  // Form submission
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm(formData)) {
      // Scroll to first error
      const firstErrorElement = document.querySelector(".error-field");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);
    clearAllErrors();

    try {
      // Prepare submission data
      const submissionData: SubmissionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        storyMapUrl: formData.storyMapUrl.trim(),
        thumbnailUrl: formData.thumbnailUrl.trim() || undefined,
        previewImages: formData.previewImages.filter((img) => img.trim()),
        category: formData.category,
        tags: formData.tags,
        region: formData.region,
        specificLocation: formData.specificLocation.trim() || undefined,
        teamMembers: formData.teamMembers.filter(
          (member) => member.name.trim() && member.email.trim()
        ),
        dataSourcesUsed: formData.dataSourcesUsed.filter(
          (source) => source.name.trim() && source.type
        ),
        copyrightCompliant: formData.copyrightCompliant,
      };

      const response = await apiService.createSubmission(submissionData);

      if (response.success) {
        router.push("/submissions?success=true");
      } else {
        setError("general", response.error || "Failed to create submission");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.error) {
        errorMessage = error.error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setError("general", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading states
  if (isLoading || isLoadingCategories) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Authentication checks
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-black mb-2">
            Authentication Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to submit your story.
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (user && !user.emailVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-md shadow-sm border border-gray-200 p-8 text-center">
          <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-black mb-2">
            Email Verification Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please verify your email address before submitting your story.
          </p>
          <div className="space-y-3">
            <button
              onClick={async () => {
                try {
                  await apiService.resendVerificationEmail(user.email);
                  alert("Verification email sent! Please check your inbox.");
                } catch (error) {
                  alert("Failed to send verification email. Please try again.");
                }
              }}
              className="w-full bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
            >
              Resend Verification Email
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4 sm:mb-6">
              Submit Your StoryMap
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Share your compelling geographic story with the world. Complete
              the form below to submit your entry to our competition.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-6 sm:space-y-8">
          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4 flex items-center error-field">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-sm sm:text-base text-red-700">
                {errors.general}
              </span>
            </div>
          )}

          {/* Form Sections */}
          <BasicInfoSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />

          <StoryMapSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onAddPreviewImage={addPreviewImage}
            onRemovePreviewImage={removePreviewImage}
          />

          <CategorizationSection
            formData={formData}
            errors={errors}
            categories={categories}
            onChange={handleInputChange}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />

          <GeographicSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />

          <TeamSection
            formData={formData}
            errors={errors}
            onAdd={addTeamMember}
            onRemove={removeTeamMember}
            onChange={handleTeamMemberChange}
          />

          <DataSourcesSection
            formData={formData}
            errors={errors}
            onAdd={addDataSource}
            onRemove={removeDataSource}
            onChange={handleDataSourceChange}
          />

          <LegalComplianceSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-black text-white font-normal rounded-md hover:bg-gray-800 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  Submit Your Entry
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubmissionForm;
