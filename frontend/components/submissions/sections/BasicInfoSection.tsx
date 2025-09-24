// components/submissions/sections/BasicInfoSection.tsx
import React from "react";
import { FileText, Globe, Plus, X, ExternalLink } from "lucide-react";
import DynamicFormField from "@/components/forms/DynamicFormField";
import { SubmissionFormData, FormErrors, FormField } from "@/types/submission";

interface BasicInfoSectionProps {
  formData: SubmissionFormData;
  errors: FormErrors;
  onChange: (field: string, value: any) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const fields: FormField[] = [
    {
      name: "title",
      label: "Submission Title",
      type: "text",
      required: true,
      placeholder: "Enter a compelling title for your StoryMap",
      maxLength: 100,
      validation: (value: string) => {
        if (!value?.trim() || value.length < 5) {
          return "Title must be at least 5 characters";
        }
        return null;
      },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder:
        "Provide a detailed description of your StoryMap project, its purpose, and key insights...",
      maxLength: 1000,
      rows: 5,
      validation: (value: string) => {
        if (!value?.trim() || value.length < 50) {
          return "Description must be at least 50 characters";
        }
        return null;
      },
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center mb-6">
        <FileText className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Basic Information
        </h2>
      </div>

      <div className="space-y-6">
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

// Preview Images Manager Component
const PreviewImagesManager: React.FC<{
  images: string[];
  onAdd: (url: string) => void;
  onRemove: (url: string) => void;
}> = ({ images, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = () => {
    if (inputValue && images.length < 5) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Preview Images (Optional, max 5)
      </label>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={images.length >= 5}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => onRemove(image)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface StoryMapSectionProps {
  formData: SubmissionFormData;
  errors: FormErrors;
  onChange: (field: string, value: any) => void;
  onAddPreviewImage: (imageUrl: string) => void;
  onRemovePreviewImage: (imageUrl: string) => void;
}

export const StoryMapSection: React.FC<StoryMapSectionProps> = ({
  formData,
  errors,
  onChange,
  onAddPreviewImage,
  onRemovePreviewImage,
}) => {
  const fields: FormField[] = [
    {
      name: "storyMapUrl",
      label: "ArcGIS StoryMaps URL",
      type: "url",
      required: true,
      placeholder:
        "https://storymaps.arcgis.com/stories/... or https://arcg.is/...",
      validation: (value: string) => {
        if (!value?.trim()) {
          return "StoryMap URL is required";
        }
        if (
          !/^https:\/\/(arcg\.is\/[a-zA-Z0-9]+|storymaps\.arcgis\.com\/stories\/[a-zA-Z0-9]+)$/i.test(
            value
          )
        ) {
          return "Please provide a valid ArcGIS StoryMaps URL";
        }
        return null;
      },
    },
    {
      name: "thumbnailUrl",
      label: "Thumbnail URL (Optional)",
      type: "url",
      placeholder: "https://example.com/thumbnail.jpg",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center mb-6">
        <Globe className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">
          StoryMap Details
        </h2>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <DynamicFormField
              field={field}
              value={formData[field.name as keyof SubmissionFormData]}
              onChange={onChange}
              error={errors[field.name]}
            />
            {field.name === "storyMapUrl" && formData.storyMapUrl && (
              <button
                type="button"
                onClick={() => window.open(formData.storyMapUrl, "_blank")}
                className="mt-2 text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View StoryMap
              </button>
            )}
          </div>
        ))}

        {/* Preview Images Section */}
        <PreviewImagesManager
          images={formData.previewImages}
          onAdd={onAddPreviewImage}
          onRemove={onRemovePreviewImage}
        />
      </div>
    </div>
  );
};
