"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import "./Blogs.css";
import Footer from "../components/Footer/Footer";
import { Blog } from "@/Types/Blog";
import { GetAllBlogs } from "@/services/api";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getAllBlogs = async () => {
    const response = await GetAllBlogs();
    setBlogs(response.data.data);
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
