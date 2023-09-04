import { createPost } from "@/lib/prisma/posts";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await request.json();

  const createdPost = await createPost({ ...body, userId: session?.user?.id });

  return NextResponse.json(createdPost);
}
