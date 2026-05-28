"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import "./Blogs.css";
import Link from "next/link";
import Footer from "../components/Footer/Footer";

type Blog = {
  _id: string;
  title: string;
  description: string;
};

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const getAllBlogs = async () => {
    try {
      const response = await fetch("/api/blog", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();
      setBlogs(data.data);
    } catch (error) {
      console.log(error);
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
            blogs.map((b) => (
              <Link href={"/blogs/" + b._id} key={b._id}>
                <Card title={b.title} desc={b.description} />
              </Link>
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
