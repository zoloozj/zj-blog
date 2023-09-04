"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { FunctionComponent, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Editor = ({ body, setBody }: any) => {
  return (
    <MDEditor
      value={body}
      onChange={(value: string | undefined) =>
        setBody((prev: any) => ({ ...prev, body: value }))
      }
    />
  );
};

export default Editor;
