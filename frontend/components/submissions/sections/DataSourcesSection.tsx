// components/submissions/sections/DataSourcesSection.tsx
import React from "react";
import { Database } from "lucide-react";
import DynamicArrayManager from "@/components/forms/DynamicArrayManager";
import {
  SubmissionFormData,
  FormErrors,
  FormField,
  DataSource,
  DataSourceType,
} from "@/types/submission";

interface DataSourcesSectionProps {
  formData: SubmissionFormData;
  errors: FormErrors;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: any) => void;
}

const DataSourcesSection: React.FC<DataSourcesSectionProps> = ({
  formData,
  errors,
  onAdd,
  onRemove,
  onChange,
}) => {
  const dataSourceTypes: DataSourceType[] = [
    "REST Service",
    "Feature Service",
    "CSV",
    "Shapefile",
    "GeoJSON",
    "Other",
  ];

  const dataSourceFields: FormField[] = [
    {
      name: "name",
      label: "Data Source Name",
      type: "text",
      required: true,
      placeholder: "Data Source Name",
      validation: (value: string) => {
        if (!value?.trim()) return "Name is required";
        return null;
      },
    },
    {
      name: "url",
      label: "Source URL (Optional)",
      type: "url",
      placeholder: "Source URL (Optional)",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      required: true,
      options: dataSourceTypes.map((type) => ({ value: type, label: type })),
      validation: (value: string) => {
        if (!value) return "Type is required";
        return null;
      },
    },
  ];

  const emptyDataSource: DataSource = { name: "", url: "", type: "" };

  return (
    <DynamicArrayManager
      title="Data Sources"
      items={formData.dataSourcesUsed}
      fields={dataSourceFields}
      maxItems={20}
      emptyItem={emptyDataSource}
      errors={errors}
      onAdd={onAdd}
      onRemove={onRemove}
      onChange={onChange}
      getItemTitle={(index) => `Data Source ${index + 1}`}
      icon={<Database className="w-6 h-6 mr-3" />}
      iconColor="text-blue-600"
    />
  );
};

export { DataSourcesSection };
