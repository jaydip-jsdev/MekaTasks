"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Tiptap from "@/app/components/reusable/TextEditor/TextEditor";
import "../../add/add.css";
import Navbar from "@/app/components/global/Navbar/Navbar";
import Footer from "@/app/components/global/Footer/Footer";
import { GetBlogById, UpdateBlog } from "@/services/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ErrorMessage";
import ClientRoutes from "@/app/ClientRoutes";

const EditBlog = () => {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchBlog = async () => {
    try {
      const response = await GetBlogById(id as string);
      const data = response.data;

      if (data.success) {
        setTitle(data.data.title);
        setDescription(data.data.description);
        setContent(data.data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !content) {
      toast.error("All fields are required");
      return;
    }

    try {
      const payload = {
        title,
        description,
        content,
      };

      const response = await UpdateBlog(id as string, payload);
      const data = response.data;

      if (data.success) {
        toast.success("Blog updated successfully");
        router.push(ClientRoutes.PROFILE);
      } else {
        toast.error(data.message);
      }

      if (response.status === 401) {
        router.push(ClientRoutes.LOGINPAGE);
        return;
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <Navbar />
      <form className="p-6 add-blog-form" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-blue-500">Edit Blog</h1>

        <div className="blog-input">
          <label className="blog-title-label">Title</label>
          <input
            type="text"
            className="blog-title"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="blog-input">
          <label className="blog-title-label">Description</label>
          <input
            type="text"
            className="blog-title"
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Tiptap key={id} content={content} setContent={setContent} />

        <div className="blog-actions">
          <button className="post-blog">UPDATE</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default EditBlog;
