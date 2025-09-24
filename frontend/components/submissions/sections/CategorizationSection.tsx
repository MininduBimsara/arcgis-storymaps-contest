// components/submissions/sections/CategorizationSection.tsx
import React from "react";
import { Tag, Plus, X } from "lucide-react";
import DynamicFormField from "@/components/forms/DynamicFormField";
import {
  SubmissionFormData,
  FormErrors,
  FormField,
  Region,
} from "@/types/submission";
import { Category } from "@/lib/api";

interface CategorizationSectionProps {
  formData: SubmissionFormData;
  errors: FormErrors;
  categories: Category[];
  onChange: (field: string, value: any) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const CategorizationSection: React.FC<CategorizationSectionProps> = ({
  formData,
  errors,
  categories,
  onChange,
  onAddTag,
  onRemoveTag,
}) => {
  const [currentTag, setCurrentTag] = React.useState("");

  const categoryField: FormField = {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: categories.map((cat) => ({ value: cat._id, label: cat.name })),
    validation: (value: string) => {
      if (!value) return "Category is required";
      return null;
    },
  };

  const handleAddTag = () => {
    if (
      currentTag.trim() &&
      !formData.tags.includes(currentTag.trim().toLowerCase()) &&
      formData.tags.length < 10
    ) {
      onAddTag(currentTag.trim().toLowerCase());
      setCurrentTag("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center mb-6">
        <Tag className="w-6 h-6 text-purple-600 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">Categorization</h2>
      </div>

      <div className="space-y-6">
        <DynamicFormField
          field={categoryField}
          value={formData.category}
          onChange={onChange}
          error={errors.category}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Optional, max 10)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter a tag"
              maxLength={30}
            />
            <button
              type="button"
              onClick={handleAddTag}
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
                  onClick={() => onRemoveTag(tag)}
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
  );
};

export default CategorizationSection;
