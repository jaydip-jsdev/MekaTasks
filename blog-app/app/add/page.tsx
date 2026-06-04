"use client";

import React, { useState } from "react";
import Tiptap from "../components/TextEditor/TextEditor";
import "./add.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ClientRoutes from "../ClientRoutes";
import { AddNewBlog } from "@/services/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ErrorMessage";

const AddBlogPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !content) {
      toast.error("all fields required");
      return;
    }

    try {
      const payload = { title, description, content };

      const response = await AddNewBlog(payload);

      if (response.status === 401) {
        window.location.href = ClientRoutes.LOGINPAGE;
        return;
      }

      setTitle("");
      setDescription("");
      setContent("");

      router.push(ClientRoutes.PROFILE);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <form action="" className="p-6 add-blog-form" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-blue-500 ">Add Blog</h1>
        <div className="blog-input">
          <label htmlFor="title" className="blog-title-label">
            title
          </label>
          <input
            type="text"
            className="blog-title"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="blog-input">
          <label htmlFor="desc" className="blog-title-label">
            Description
          </label>
          <input
            type="text"
            className="blog-title"
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Tiptap content={content} setContent={setContent} />
        <div className="blog-actions">
          <button className="post-blog">POST</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default AddBlogPage;
