"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  X,
  Plus,
  MapPin,
  Users,
  FileText,
  Globe,
  Tag,
  Database,
  CheckCircle,
  AlertCircle,
  Calendar,
  Loader2,
  Eye,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import apiService, { SubmissionData, Category } from "@/lib/api";

// Type definitions based on the Submission model
interface TeamMember {
  name: string;
  email: string;
  role: string;
}

interface DataSource {
  name: string;
  url: string;
  type:
    | "REST Service"
    | "Feature Service"
    | "CSV"
    | "Shapefile"
    | "GeoJSON"
    | "Other"
    | "";
}

interface SubmissionFormData {
  title: string;
  description: string;
  storyMapUrl: string;
  thumbnailUrl: string;
  previewImages: string[];
  category: string;
  tags: string[];
  region:
    | "North America"
    | "South America"
    | "Europe"
    | "Africa"
    | "Asia"
    | "Oceania"
    | "Global"
    | "";
  specificLocation: string;
  teamMembers: TeamMember[];
  dataSourcesUsed: DataSource[];
  copyrightCompliant: boolean;
}

interface FormErrors {
  [key: string]: string | null;
}

type Region =
  | "North America"
  | "South America"
  | "Europe"
  | "Africa"
  | "Asia"
  | "Oceania"
  | "Global";

type DataSourceType =
  | "REST Service"
  | "Feature Service"
  | "CSV"
  | "Shapefile"
  | "GeoJSON"
  | "Other";

const SubmissionPage: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

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
  const [currentTag, setCurrentTag] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const regions: Region[] = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Asia",
    "Oceania",
    "Global",
  ];

  const dataSourceTypes: DataSourceType[] = [
    "REST Service",
    "Feature Service",
    "CSV",
    "Shapefile",
    "GeoJSON",
    "Other",
  ];

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

  // Check if user email is verified
  useEffect(() => {
    if (user && !user.emailVerified) {
      // Show a warning or redirect to email verification
      console.warn("User email not verified");
    }
  }, [user]);

  const handleInputChange = (
    field: keyof SubmissionFormData,
    value: any
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleArrayChange = (
    field: "teamMembers" | "dataSourcesUsed",
    index: number,
    subField: string,
    value: string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, [subField]: value } : item
      ),
    }));
  };

  const addArrayItem = (
    field: "teamMembers" | "dataSourcesUsed",
    template: TeamMember | DataSource
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  const removeArrayItem = (
    field: "teamMembers" | "dataSourcesUsed",
    index: number
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addTag = (): void => {
    if (
      currentTag.trim() &&
      !formData.tags.includes(currentTag.trim().toLowerCase()) &&
      formData.tags.length < 10
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim().toLowerCase()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string): void => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim() || formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.description.trim() || formData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    if (!formData.storyMapUrl.trim()) {
      newErrors.storyMapUrl = "StoryMap URL is required";
    } else if (
      !/^https:\/\/(arcg\.is\/[a-zA-Z0-9]+|storymaps\.arcgis\.com\/stories\/[a-zA-Z0-9]+)$/i.test(
        formData.storyMapUrl
      )
    ) {
      newErrors.storyMapUrl = "Please provide a valid ArcGIS StoryMaps URL";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.region) {
      newErrors.region = "Region is required";
    }

    if (!formData.copyrightCompliant) {
      newErrors.copyrightCompliant =
        "Copyright compliance confirmation is required";
    }

    // Validate team members
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

    // Validate data sources
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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector(".error-field");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

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
        // Success - redirect to submissions page or show success message
        router.push("/submissions?success=true");
      } else {
        setErrors({ general: response.error || "Failed to create submission" });
      }
    } catch (error: any) {
      console.error("Submission error:", error);

      if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      } else if (error.error) {
        setErrors({ general: error.error });
      } else if (error.message) {
        setErrors({ general: error.message });
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Show loading spinner while checking authentication or loading categories
  if (isLoading || isLoadingCategories) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to submit your story.
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Show warning if email not verified
  if (user && !user.emailVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email Verification Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please verify your email address before submitting your story. Check
            your inbox for a verification email.
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
              className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Resend Verification Email
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Submit Your StoryMap
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your compelling geographic story with the world. Complete
              the form below to submit your entry to our competition.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Error Message */}
          {errors.general && (
            <div className="bg-red-100 border border-red-300 rounded-xl p-4 flex items-center error-field">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-800">{errors.general}</span>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submission Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.title
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter a compelling title for your StoryMap"
                  maxLength={100}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.title}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.description
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  placeholder="Provide a detailed description of your StoryMap project, its purpose, and key insights..."
                  maxLength={1000}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/1000 characters
                </p>
              </div>
            </div>
          </div>

          {/* Categorization */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <Tag className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Categorization
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.category
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional, max 10)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter a tag"
                    maxLength={30}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={formData.tags.length >= 10}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-purple-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.tags.length}/10 tags
                </p>
              </div>
            </div>
          </div>

          {/* Geographic Information */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Geographic Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) =>
                    handleInputChange("region", e.target.value as Region)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                    errors.region
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.region}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Location (Optional)
                </label>
                <input
                  type="text"
                  value={formData.specificLocation}
                  onChange={(e) =>
                    handleInputChange("specificLocation", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="e.g., Colombo, Western Province"
                  maxLength={100}
                />
              </div>
            </div>
          </div>

          {/* StoryMap Details */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                StoryMap Details
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ArcGIS StoryMaps URL *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={formData.storyMapUrl}
                    onChange={(e) =>
                      handleInputChange("storyMapUrl", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-12 ${
                      errors.storyMapUrl
                        ? "border-red-500 error-field"
                        : "border-gray-300"
                    }`}
                    placeholder="https://storymaps.arcgis.com/stories/... or https://arcg.is/..."
                  />
                  {formData.storyMapUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        window.open(formData.storyMapUrl, "_blank")
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {errors.storyMapUrl && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.storyMapUrl}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Paste the URL of your published ArcGIS StoryMap
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.thumbnailUrl}
                  onChange={(e) =>
                    handleInputChange("thumbnailUrl", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="https://example.com/thumbnail.jpg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  A representative image for your story
                </p>
              </div>

              {/* Preview Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview Images (Optional, max 5)
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          if (input.value) {
                            addPreviewImage(input.value);
                            input.value = "";
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement)
                          .previousElementSibling as HTMLInputElement;
                        if (input.value) {
                          addPreviewImage(input.value);
                          input.value = "";
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.previewImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removePreviewImage(image)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categorization */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <Tag className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Categorization
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.category
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional, max 10)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter a tag"
                    maxLength={30}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={formData.tags.length >= 10}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-purple-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.tags.length}/10 tags
                </p>
              </div>
            </div>
          </div>

          {/* Geographic Information */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Geographic Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) =>
                    handleInputChange("region", e.target.value as Region)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                    errors.region
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select a region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.region}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Location (Optional)
                </label>
                <input
                  type="text"
                  value={formData.specificLocation}
                  onChange={(e) =>
                    handleInputChange("specificLocation", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="e.g., Colombo, Western Province"
                  maxLength={100}
                />
              </div>
            </div>
          </div>

          {/* Team Information */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Team Information
              </h2>
            </div>

            <div className="space-y-4">
              {formData.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Team Member {index + 1}
                    </h3>
                    {formData.teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("teamMembers", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleArrayChange(
                            "teamMembers",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors[`teamMember_${index}_name`]
                            ? "border-red-500 error-field"
                            : "border-gray-300"
                        }`}
                        placeholder="Full Name"
                        maxLength={100}
                      />
                      {errors[`teamMember_${index}_name`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`teamMember_${index}_name`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          handleArrayChange(
                            "teamMembers",
                            index,
                            "email",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors[`teamMember_${index}_email`]
                            ? "border-red-500 error-field"
                            : "border-gray-300"
                        }`}
                        placeholder="Email Address"
                      />
                      {errors[`teamMember_${index}_email`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`teamMember_${index}_email`]}
                        </p>
                      )}
                    </div>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) =>
                        handleArrayChange(
                          "teamMembers",
                          index,
                          "role",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Role/Title"
                      maxLength={50}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("teamMembers", { name: "", email: "", role: "" })
                }
                disabled={formData.teamMembers.length >= 10}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </button>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <Database className="w-6 h-6 text-orange-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Data Sources
              </h2>
            </div>

            <div className="space-y-4">
              {formData.dataSourcesUsed.map((source, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Data Source {index + 1}
                    </h3>
                    {formData.dataSourcesUsed.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("dataSourcesUsed", index)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        value={source.name}
                        onChange={(e) =>
                          handleArrayChange(
                            "dataSourcesUsed",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors[`dataSource_${index}_name`]
                            ? "border-red-500 error-field"
                            : "border-gray-300"
                        }`}
                        placeholder="Data Source Name"
                      />
                      {errors[`dataSource_${index}_name`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`dataSource_${index}_name`]}
                        </p>
                      )}
                    </div>
                    <input
                      type="url"
                      value={source.url}
                      onChange={(e) =>
                        handleArrayChange(
                          "dataSourcesUsed",
                          index,
                          "url",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Source URL (Optional)"
                    />
                    <div>
                      <select
                        value={source.type}
                        onChange={(e) =>
                          handleArrayChange(
                            "dataSourcesUsed",
                            index,
                            "type",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors[`dataSource_${index}_type`]
                            ? "border-red-500 error-field"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Type</option>
                        {dataSourceTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors[`dataSource_${index}_type`] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[`dataSource_${index}_type`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("dataSourcesUsed", {
                    name: "",
                    url: "",
                    type: "",
                  })
                }
                disabled={formData.dataSourcesUsed.length >= 20}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Data Source
              </button>
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Legal Compliance
              </h2>
            </div>

            <div className="space-y-4">
              <label
                className={`flex items-start space-x-3 ${errors.copyrightCompliant ? "error-field" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={formData.copyrightCompliant}
                  onChange={(e) =>
                    handleInputChange("copyrightCompliant", e.target.checked)
                  }
                  className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    Copyright Compliance Confirmation *
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    I confirm that all content, data, and materials used in this
                    submission comply with copyright laws and that I have the
                    necessary rights to use them in this competition.
                  </p>
                </div>
              </label>
              {errors.copyrightCompliant && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.copyrightCompliant}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

export default SubmissionPage;
