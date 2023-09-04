import React, { FunctionComponent } from "react";
import { User as TUser } from "@/types/index";
import { Post as TPost } from "@prisma/client";
import Post from "./blog/Post";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/prisma/posts";
import { DefaultUser } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";

interface AuthotProps {
  user: DefaultUser;
  isEditable?: boolean
}

const Author: FunctionComponent<AuthotProps> = async ({ user, isEditable }) => {
  const { posts } = await getPosts({ where: { userId: user.id }, take: 10 });

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
          {user.name}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {user.email}
        </p>
        <Button type="button">
          <Link href="/blog/create">Шинээр пост оруулах</Link>
        </Button>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {
          // eslint-disable-next-line react/jsx-key
          posts && !posts.length
            ? "Нийтлэл олдсонгүй..."
            : posts &&
              posts.map((post: TPost) => (
                <Post key={post.id} post={post} isEditable={isEditable} />
              ))
        }
      </ul>
    </div>
  );
};

export default Author;
