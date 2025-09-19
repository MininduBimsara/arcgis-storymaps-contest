export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "draft" | "active" | "closed" | "judging";
  maxSubmissions: number;
  categories: string[];
  prizes: Prize[];
  rules: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission {
  id: string;
  competitionId: string;
  title: string;
  description: string;
  authorName: string;
  authorEmail: string;
  storyMapUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  status: "draft" | "submitted" | "approved" | "rejected";
  votes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  value: string;
  position: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ArcGIS related types
export interface MapConfig {
  center: [number, number];
  zoom: number;
  basemap: string;
}

export interface StoryMapConfig {
  itemId: string;
  portalUrl?: string;
  width?: string;
  height?: string;
}
