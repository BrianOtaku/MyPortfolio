// User Interfaces

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Asset Interfaces

export interface Showcase {
  type: "image" | "video";
  url: string;
  publicId: string;
}

export interface Asset {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  gitUrl: string;
  itchUrl: string;
  publicId: string;
  showcase: Showcase[];
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

// Comment Interfaces

export interface CommentUser {
  _id: string;
  name: string;
  email: string;
}

export interface Comment {
  _id: string;
  asset: string;
  user: CommentUser;
  content: string;
  parentComment: string | null;
  createdAt: string;
  updatedAt: string;
}
