import {
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from "@/lib/prisma/posts";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const post = await getPostById(id);

  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const body = await request.json();

  const updatedPost = await updatePost(id, body);

  return NextResponse.json(updatedPost);
}

export async function DELETE(_request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const post = await getPostById(id);

  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const removePost = await deletePost(id);

  return NextResponse.json(removePost);
}
