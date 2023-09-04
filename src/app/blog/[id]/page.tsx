import React, { FunctionComponent } from "react";
import { notFound } from "next/navigation";
import { Post as TPost } from "@prisma/client";
import { getPostById, getPosts } from "@/lib/prisma/posts";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const { post, error } = await getPostById(id);

  return {
    title: post?.title,
    description: post?.description,
    body: post?.body,
    error,
  };
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const { title, description, body, error } = await generateMetadata({
    params: { id },
  });

  if ((!title && !description) || error) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl uppercase text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <article>
        <p className="text-gray-500 dark:text-gray-400 my-4">{description}</p>
        {/* @ts-ignore */}
        <ReactMarkdown>{body}</ReactMarkdown>
      </article>
    </div>
  );
};

export default Page;
