/**
 * Comment API
 * Quản lý các API liên quan đến comments
 */

import { httpClient, ApiResponse } from "./httpClient";
import { Comment } from "../types/interfaces";

export interface CreateCommentPayload {
  content: string;
  parentComment?: string | null;
}

export interface UpdateCommentPayload {
  content?: string;
}

/**
 * Lấy danh sách comment của asset
 */
export async function getAssetComments(
  assetId: string,
): Promise<ApiResponse<Comment[]>> {
  return httpClient<Comment[]>(`/api/assets/${assetId}/comment`, {
    method: "GET",
  });
}

/**
 * Lấy comment theo ID
 */
export async function getCommentById(
  assetId: string,
  commentId: string,
): Promise<ApiResponse<Comment>> {
  return httpClient<Comment>(`/api/assets/${assetId}/comment/${commentId}`, {
    method: "GET",
  });
}

/**
 * Tạo comment mới cho asset
 */
export async function createComment(
  assetId: string,
  commentData: CreateCommentPayload,
): Promise<ApiResponse<Comment>> {
  return httpClient<Comment>(`/api/assets/${assetId}/comment`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
}

/**
 * Cập nhật comment
 */
export async function updateComment(
  assetId: string,
  commentId: string,
  commentData: UpdateCommentPayload,
): Promise<ApiResponse<Comment>> {
  return httpClient<Comment>(`/api/assets/${assetId}/comment/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(commentData),
  });
}

/**
 * Xóa comment
 */
export async function deleteComment(
  assetId: string,
  commentId: string,
): Promise<ApiResponse<{ success: boolean }>> {
  return httpClient(`/api/assets/${assetId}/comment/${commentId}`, {
    method: "DELETE",
  });
}
