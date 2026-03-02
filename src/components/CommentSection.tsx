"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface CommentType {
  _id: string;
  content: string;
  user?: { name?: string; email?: string };
  createdAt: string;
}

interface Props {
  assetId: string;
}

export default function CommentSection({ assetId }: Props) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/assets/${assetId}/comment`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setComments(data);
      } catch (e) {
        console.error("Error loading comments", e);
      }
    }
    load();
  }, [assetId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/assets/${assetId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to post");
      }
      const created = await res.json();
      setComments((prev) => [...prev, created]);
      setNewComment("");
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError(String(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4 max-h-64 overflow-y-auto">
          {comments.map((c) => (
            <li key={c._id} className="border p-3 rounded">
              <div className="text-sm text-gray-600 mb-1">
                <strong>{c.user?.name || "Anonymous"}</strong> •{" "}
                {new Date(c.createdAt).toLocaleString()}
              </div>
              <div>{c.content}</div>
            </li>
          ))}
        </ul>
      )}

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </form>
      ) : (
        <p className="text-gray-500 mt-2">
          Please&nbsp;
          <a href="/login" className="text-blue-600 underline">
            sign in
          </a>
          &nbsp;to post a comment.
        </p>
      )}
    </div>
  );
}
