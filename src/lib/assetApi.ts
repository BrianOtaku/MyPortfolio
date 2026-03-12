/**
 * Asset API
 * Quản lý các API liên quan đến assets
 */

import { httpClient, ApiResponse } from "./httpClient";
import { Asset } from "../types/interfaces";

export interface CreateAssetPayload {
  title: string;
  description: string;
  fileUrl: string;
  publicId: string;
  showcase: Array<{
    type: "image" | "video";
    url: string;
    publicId: string;
  }>;
}

export interface UpdateAssetPayload {
  title?: string;
  description?: string;
  fileUrl?: string;
  publicId?: string;
  showcase?: Array<{
    type: "image" | "video";
    url: string;
    publicId: string;
  }>;
}

/**
 * Lấy danh sách tất cả assets
 */
export async function getAssets(): Promise<ApiResponse<Asset[]>> {
  return httpClient<Asset[]>("/api/assets", {
    method: "GET",
  });
}

/**
 * Lấy thông tin chi tiết của một asset
 */
// export async function getAssetById(id: string): Promise<ApiResponse<Asset>> {
//   return httpClient<Asset>(`/api/assets/${id}`, {
//     method: "GET",
//   });
// }

/**
 * Tạo asset mới
 */
export async function createAsset(
  assetData: CreateAssetPayload,
): Promise<ApiResponse<Asset>> {
  return httpClient<Asset>("/api/assets", {
    method: "POST",
    body: JSON.stringify(assetData),
  });
}

/**
 * Cập nhật asset
 */
export async function updateAsset(
  id: string,
  assetData: UpdateAssetPayload,
): Promise<ApiResponse<Asset>> {
  return httpClient<Asset>(`/api/assets/${id}`, {
    method: "PUT",
    body: JSON.stringify(assetData),
  });
}

/**
 * Xóa asset
 */
export async function deleteAsset(
  id: string,
): Promise<ApiResponse<{ success: boolean }>> {
  return httpClient(`/api/assets/${id}`, {
    method: "DELETE",
  });
}

/**
 * Download asset
 */
export async function downloadAsset(
  id: string,
): Promise<ApiResponse<{ downloadUrl: string }>> {
  return httpClient(`/api/assets/${id}/download`, {
    method: "GET",
  });
}
