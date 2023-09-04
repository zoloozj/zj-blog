import Post from "@/components/blog/Post";
import SearchForm from "@/components/blog/SearchForm";
import Pagination from "@/components/common/Pagination";
import { getPosts } from "@/lib/prisma/posts";
import { notFound } from "next/navigation";
import React, { FunctionComponent } from "react";
interface AllPostsProps {
  searchParams: {
    page?: string;
    searchValues?: string;
  };
}

const POSTS_PER_PAGE = 3;

const AllPosts: FunctionComponent<AllPostsProps> = async ({ searchParams }) => {
  const curPage = parseInt(searchParams.page || "1");
  const skip = curPage * POSTS_PER_PAGE - POSTS_PER_PAGE;
  const searchValue = searchParams.searchValues;
  const {
    posts = [],
    error,
    count,
  } = await getPosts({
    take: POSTS_PER_PAGE,
    skip,
    orderBy: { createdAt: "desc" },
    where: {
      OR: [
        {
          title: { contains: searchValue, mode: "insensitive" },
        },
        {
          description: { contains: searchValue, mode: "insensitive" },
        },
      ],
    },
  });

  const totalPages = Math.ceil(count! / POSTS_PER_PAGE);

  if (error && !posts) {
    notFound();
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
          Бүх Постууд
        </h1>
      </div>
      <div className="py-4 my-4">
        <SearchForm searchValues={searchValue} />
      </div>
      <ul className="p-4">
        {!posts.length
          ? "Нийтлэл олдсонгүй..."
          : posts.map((post) => <Post key={post.id} post={post} />)}
      </ul>
      <Pagination currentPage={curPage} totalPages={totalPages} />
    </div>
  );
};

export default AllPosts;
