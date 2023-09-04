import Post from "@/components/blog/Post";
import SearchForm from "@/components/blog/SearchForm";
import { getPosts } from "@/lib/prisma/posts";
import { Post as TPost } from "@prisma/client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { posts = [] } = await getPosts({ take: 100 });

  return posts.map((post: TPost) => ({ id: post.id }));
}
interface HomePageProps {
  searchParams: {
    searchValues?: string;
  };
}
export default async function Home({ searchParams }: HomePageProps) {
  const searchValue = searchParams.searchValues;
  const { posts = [], error = "" }: { posts?: TPost[]; error?: any } =
    await getPosts({
      where: {
        published: true,
        OR: [
          {
            title: { contains: searchValue, mode: "insensitive" },
          },
          {
            description: { contains: searchValue, mode: "insensitive" },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

  if (error) {
    return (
      <div>
        <p className="space-y-4 my-4">Нийтлэл олдсонгүй...</p>
        {error.message}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
          Сүүлд нэмэгдсэн
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          NextJS, Tailwindcss технологиор хийж бүтээв...
        </p>
      </div>
      <SearchForm />
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {
          // eslint-disable-next-line react/jsx-key
          !posts.length
            ? "Нийтлэл олдсонгүй..."
            : posts.map((post) => <Post key={post.id} post={post} />)
        }
      </ul>
    </div>
  );
}
