"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Tiptap from "@/app/components/TextEditor/TextEditor";
import "../../add/add.css";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

const EditBlog = () => {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setTitle(data.data.title);
          setDescription(data.data.description);
          setContent(data.data.content);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !content) {
      alert("All fields are required");
      return;
    }

    try {
      const payload = {
        title,
        description,
        content,
      };

      const response = await fetch(`/api/blog/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert("Blog updated successfully");
        router.push("/profile");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
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
