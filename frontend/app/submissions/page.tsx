import React, { useState } from "react";
import {
  Upload,
  X,
  Plus,
  MapPin,
  Users,
  FileText,
  Globe,
  Tag,
  Image,
  Link,
  Database,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";

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

type Category =
  | "Environmental Monitoring"
  | "Urban Planning"
  | "Transportation"
  | "Demographics"
  | "Climate Change"
  | "Public Health"
  | "Education"
  | "Emergency Response";

type DataSourceType =
  | "REST Service"
  | "Feature Service"
  | "CSV"
  | "Shapefile"
  | "GeoJSON"
  | "Other";

const SubmissionPage: React.FC = () => {
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

  const [currentTag, setCurrentTag] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const regions: Region[] = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Asia",
    "Oceania",
    "Global",
  ];

  const categories: Category[] = [
    "Environmental Monitoring",
    "Urban Planning",
    "Transportation",
    "Demographics",
    "Climate Change",
    "Public Health",
    "Education",
    "Emergency Response",
  ];

  const dataSourceTypes: DataSourceType[] = [
    "REST Service",
    "Feature Service",
    "CSV",
    "Shapefile",
    "GeoJSON",
    "Other",
  ];

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
      !formData.tags.includes(currentTag.trim().toLowerCase())
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
      !/^https:\/\/storymaps\.arcgis\.com\/stories\/[a-zA-Z0-9]+$/.test(
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Submission successful! Your entry has been received.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

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
                    errors.title ? "border-red-500" : "border-gray-300"
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
                    errors.description ? "border-red-500" : "border-gray-300"
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
                <input
                  type="url"
                  value={formData.storyMapUrl}
                  onChange={(e) =>
                    handleInputChange("storyMapUrl", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.storyMapUrl ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://storymaps.arcgis.com/stories/..."
                />
                {errors.storyMapUrl && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.storyMapUrl}
                  </p>
                )}
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
                    handleInputChange("category", e.target.value as Category)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
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
                  Tags
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
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
                    errors.region ? "border-red-500" : "border-gray-300"
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
                  placeholder="e.g., New York City, California"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Full Name"
                      maxLength={100}
                    />
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
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Email Address"
                    />
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
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Data Source Name"
                    />
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
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select Type</option>
                      {dataSourceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
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
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center justify-center"
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
              <label className="flex items-start space-x-3">
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
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Submit Your Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;
