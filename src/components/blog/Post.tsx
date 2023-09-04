import Link from "next/link";
import React from "react";
import { Post as TPost } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PostProps {
  post: TPost;
  isEditable?: boolean;
}

const Post = ({ post, isEditable }: PostProps) => {
  const { id, title, body, description, publishedAt } = post;

  const date = publishedAt
    ? format(publishedAt!, "yyyy - MM - dd / H:mm")
    : null;

  return (
    <li key={id} className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Нийтэлсэн огноо</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date?.toString()}> {date} </time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    href={`/blog/${id}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {description}
              </div>
            </div>
            <div className="text-base font-medium leading-6 flex justify-between">
              <Link
                href={`/blog/${id}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                Цааш &rarr;
              </Link>
              <div>
                {isEditable && (
                  <Button>
                    <Link href={`/blog/edit/${post.id}`}>Засах</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Post;
