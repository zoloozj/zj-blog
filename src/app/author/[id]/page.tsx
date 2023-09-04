import Author from "@/components/Author";
import { getUserById } from "@/lib/prisma/users";
import { notFound } from "next/navigation";
import React, { FunctionComponent } from "react";
interface AuthorPageProps {
  params: {
    id: string;
  };
}
const AuthorPage: FunctionComponent<AuthorPageProps> = async ({
  params: { id },
}) => {
  const { user, error } = await getUserById(id);

  if (!user && error) {
    notFound();
  }
  //@ts-ignore
  return <Author user={user} />;
};

export default AuthorPage;
