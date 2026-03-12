import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getAssetComments, createComment } from "../lib/commentApi";

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
  const PAGE_SIZE = 5;

  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  // fetch a page of comments
  const loadComments = React.useCallback(
    async (pageToLoad: number) => {
      try {
        const res = await getAssetComments(assetId, pageToLoad, PAGE_SIZE);
        if (res.success && res.data) {
          const data = res.data || [];
          if (pageToLoad === 1) {
            setComments(data);
          } else {
            setComments((prev) => [...prev, ...data]);
          }
          setHasMore(data.length === PAGE_SIZE);
        }
      } catch (e) {
        console.error("Error loading comments", e);
      }
    },
    [assetId],
  );

  useEffect(() => {
    // reset and load first page when asset changes
    setPage(1);
    setHasMore(true);
    (async () => {
      await loadComments(1);
    })();
  }, [assetId, loadComments]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await createComment(assetId, { content: newComment.trim() });
      if (res.success && res.data) {
        const created = res.data;
        // new comment goes to the front
        setComments((prev) => [created, ...prev]);
        setNewComment("");
      } else {
        setError("Failed to post comment");
      }
    } catch (e: unknown) {
      // nếu e là Error thì lấy message, nếu không thì chuyển e thành string
      if (e instanceof Error) setError(e.message);
      else setError(String(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-t-4 border-cyan-400 p-6 bg-zinc-900">
      <h3 className="text-sm text-cyan-400 mb-6">&gt; COMMENTS</h3>

      {/* Comment Form */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="border-4 border-white p-4 bg-black mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="LEAVE YOUR COMMENT..."
              className="w-full bg-transparent text-[10px] text-white outline-none resize-none"
              rows={4}
              style={{ textTransform: "uppercase" }}
            />
          </div>
          {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="border-4 border-white bg-black px-6 py-3 text-xs text-white hover:bg-cyan-400 hover:border-cyan-400 hover:text-black transition-all"
          >
            {submitting ? "POSTING..." : "> POST COMMENT"}
          </button>
        </form>
      ) : (
        <p className="text-white/60 mb-6">
          Please&nbsp;
          <a href="/auth" className="text-cyan-400 underline">
            sign in
          </a>
          &nbsp;to post a comment.
        </p>
      )}

      {comments.length === 0 ? (
        <p className="text-white/60">No comments yet.</p>
      ) : (
        <>
          <ul className="space-y-4 h-full overflow-y-auto">
            {comments.map((c) => (
              <li key={c._id} className="border-4 border-white p-4 bg-black">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] text-cyan-400">
                        {c.user?.name || c.user?.email || "Unknown User"}
                      </span>
                      <span className="text-[8px] text-white/40">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p
                      className="text-[10px] text-white/80 leading-loose"
                      style={{ textTransform: "uppercase" }}
                    >
                      {c.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={async () => {
                const next = page + 1;
                await loadComments(next);
                setPage(next);
              }}
              className="mt-4 text-cyan-400 text-xs underline hover:text-white transition-colors cursor-pointer"
            >
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}
