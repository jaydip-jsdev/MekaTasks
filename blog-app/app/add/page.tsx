"use client";

import React, { useState } from "react";
import Tiptap from "../components/TextEditor/TextEditor";
import "./add.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !content) {
      alert("All fields are required");
      console.log({ title, description, content });
      return;
    }

    try {
      const payload = { title, description, content };

      const response = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert("Blog created successfull");
        setTitle("");
        setDescription("");
        setContent("");
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
