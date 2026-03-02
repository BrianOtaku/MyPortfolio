import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Comment from "@/src/models/Comment";
import mongoose from "mongoose";
import { requireAuth } from "@/src/utils/auth";
import type { NextRequest } from "next/server";

interface Params {
  params: {
    id: string; // asset id
  };
}

// public: get all comments for given asset
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid asset id" }, { status: 400 });
    }

    const comments = await Comment.find({ asset: id })
      .populate("user", "name email")
      .sort({ createdAt: 1 });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Comment GET error", error);
    return NextResponse.json(
      { error: "Failed to load comments" },
      { status: 500 },
    );
  }
}

// create a comment (any authenticated user)
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { isAuthorized, token, response } = await requireAuth(req);
    if (!isAuthorized) return response;

    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid asset id" }, { status: 400 });
    }

    const body = await req.json();
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const parentComment = body.parentComment;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    if (parentComment && !mongoose.Types.ObjectId.isValid(parentComment)) {
      return NextResponse.json(
        { error: "Invalid parentComment id" },
        { status: 400 },
      );
    }

    const comment = await Comment.create({
      asset: id,
      user: token!.id,
      content,
      parentComment: parentComment || null,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Comment POST error", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}

// update comment content (owner or admin)
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { isAuthorized, token, response } = await requireAuth(req);
    if (!isAuthorized) return response;

    await connectDB();

    const body = await req.json();
    const { commentId, content } = body;
    const { id } = await params;

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json(
        { error: "Invalid comment id" },
        { status: 400 },
      );
    }
    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const comment = await Comment.findById(commentId);
    if (!comment || comment.asset.toString() !== id) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.user.toString() !== token!.id && token!.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    comment.content = content.trim();
    await comment.save();

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Comment PUT error", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 },
    );
  }
}

// delete a comment (owner or admin)
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { isAuthorized, token, response } = await requireAuth(req);
    if (!isAuthorized) return response;

    await connectDB();

    const body = await req.json();
    const { commentId } = body;
    const { id } = await params;

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json(
        { error: "Invalid comment id" },
        { status: 400 },
      );
    }

    const comment = await Comment.findById(commentId);
    if (!comment || comment.asset.toString() !== id) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.user.toString() !== token!.id && token!.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await comment.deleteOne();
    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Comment DELETE error", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
