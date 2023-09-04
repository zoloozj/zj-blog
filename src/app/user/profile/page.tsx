import Author from "@/components/Author";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { FunctionComponent } from "react";

const Page: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return <Author user={session.user} isEditable={true} />;
};

export default Page;
