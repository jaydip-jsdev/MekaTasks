"use client";

import Navbar from "@/app/components/Navbar/Navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./blogDetails.css";
import Footer from "@/app/components/Footer/Footer";
import { Blog } from "@/Types/Blog";
import { GetBlogById } from "@/services/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ErrorMessage";

const BlogDetailPage = () => {
  const params = useParams();
  const id = params.id;

  const [blog, setBlog] = useState<Blog | null>(null);

  const getBlogDetails = async () => {
    try {
      const { data } = await GetBlogById(id as string);

      if (data.success) {
        setBlog(data.data);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getBlogDetails();
    }
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="blog-details-container">
        <img src="/cover.webp" alt="blog" className="blog-detail-page-cover" />
        {blog && (
          <>
            <h1 className="blog-detail-title">{blog.title}</h1>
            <p className="blog-detail-desc">{blog.description}</p>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
