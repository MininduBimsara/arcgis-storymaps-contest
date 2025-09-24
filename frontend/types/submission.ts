// types/submission.ts
export interface TeamMember {
  name: string;
  email: string;
  role: string;
}

export interface DataSource {
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

export interface SubmissionFormData {
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

export interface FormErrors {
  [key: string]: string | null;
}

export type Region =
  | "North America"
  | "South America"
  | "Europe"
  | "Africa"
  | "Asia"
  | "Oceania"
  | "Global";

export type DataSourceType =
  | "REST Service"
  | "Feature Service"
  | "CSV"
  | "Shapefile"
  | "GeoJSON"
  | "Other";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "email" | "url" | "checkbox";
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  options?: { value: string; label: string }[];
  validation?: (value: any) => string | null;
}
