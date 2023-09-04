"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Post as TPost } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Editor from "../common/Editor";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface BlogFormProps {
  post?: TPost | null;
}

interface InfoType {
  message: string | null;
  body: string;
}

const formSchema = z.object({
  title: z
    .string({ required_error: "Гарчиг оруулна уу" })
    .min(2, { message: "Хамгийн багадаа 2 тэмдэгттэй байх ёстой" })
    .max(100, { message: "50 тэмдэгтээс илүүгүй байлгана уу!" }),
  description: z
    .string({ required_error: "Хураагүй тайлбар оруулна уу" })
    .min(20, { message: "Хамгийн багадаа 5 тэмдэгттэй байх ёстой" })
    .max(500, { message: "50 тэмдэгтээс илүүгүй байлгана уу!" }),
  published: z.boolean(),
});

const BlogForm: FunctionComponent<BlogFormProps> = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [info, setInfo] = useState<InfoType>({
    message: null,
    body: post?.body!,
  });

  useEffect(() => {
    if (!info.message) return;

    const timeout = setTimeout(() => {
      setInfo((prev) => ({ ...prev, message: null }));
    }, 2000);
  }, [info]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title,
      description: post?.description || "",
      published: post?.published || false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const finalValues = {
      ...values,
      publishedAt: values.published ? new Date() : null,
      body: info.body,
    };

    if (post) {
      // Update Post
      fetch(`/api/post/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(finalValues),
      })
        .then(() =>
          setInfo((prev) => ({ ...prev, message: "Ажилттай хадгаллаа!!!" }))
        )
        .catch((error) => {
          setInfo((prev) => ({ ...prev, message: error.message }));
        });
    } else {
      // Add Post
      fetch("/api/post", { method: "POST", body: JSON.stringify(finalValues) })
        .then((res) => res.json())
        .then(({ post }) => {
          setInfo((prev) => ({ ...prev, message: "Ажилттай Нэмэгдлээ!!!" }));

          router.push(`/blog/edit/${post?.id}`);
        })
        .catch((error) => {
          setInfo((prev) => ({ ...prev, message: error.message }));
        });
    }
  }

  const onDelete = () => {
    if (post)
      if (confirm("Постыг устгахдаа итгэлтэй байна уу?"))
      // Delete Post
        fetch(`/api/post/${post.id}`, { method: "PUT" })
          .then(() => router.push("/user/profile"))
          .catch((error) => setInfo((prev) => ({ ...prev, message: error })));
  };

  if (!session) {
    return <div>Та эхлээд нэвтэрч орно уу</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
        {post ? "Блог засварлах" : "Блог бичих"}
      </h1>

      {info.message && (
        <div className="py-4 text-md text-sky-400">{info.message}</div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Гарчиг</FormLabel>
                <FormControl>
                  <Input placeholder="Гарчиг..." {...field} />
                </FormControl>
                <FormDescription>
                  Гарчиг ойлгомжтой, товч тодорхой байх хэрэтэй!
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Хураангуй</FormLabel>
                <FormControl>
                  <Textarea placeholder="Агуулга..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Блогыг нийтлэх үү?</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Editor body={info.body} setBody={setInfo} />
          <div>
            <Button className="float-right" type="submit">
              хадгалах
            </Button>
            {post && (
              <Button
                onClick={onDelete}
                className="float-left bg-red-600"
                type="button"
              >
                Устгах
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default BlogForm;
