import BlogForm from "@/components/blog/Form";
import { getPostById } from "@/lib/prisma/posts";
import React, { FunctionComponent } from "react";

interface EditBlogProps {
  params: { id: string };
}

const EditBlog: FunctionComponent<EditBlogProps> = async ({ params: { id } }) => {
  const { post, error } = await getPostById(id);
  return <BlogForm post={post} />;
};

export default EditBlog;
