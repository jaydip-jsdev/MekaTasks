"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar/Navbar";
import Card from "../components/reusable/Card/Card";
import "./Blogs.css";
import Footer from "../components/global/Footer/Footer";
import { Blog } from "@/Types/Blog";
import { GetAllBlogs } from "@/services/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ErrorMessage";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getAllBlogs = async () => {
    try {
      const response = await GetAllBlogs();
      const blogs = response?.data?.data;
      if (!blogs) {
        toast.error("Blogs not found");
        return;
      }
      setBlogs(blogs);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="blog-page-container">
        <div className="blog-page-header">
          <h2 className="blog-page-title">Blogs</h2>
        </div>
        <div className="card-container">
          {blogs.length > 0 ? (
            blogs?.map((b) => (
              <Card
                key={b._id}
                id={b._id}
                title={b.title}
                desc={b.description}
              />
            ))
          ) : (
            <p>no blogs found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogsPage;
