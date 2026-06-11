"use client";

import React, { useEffect, useState } from "react";
import "./Featured.css";
import Card from "../../reusable/Card/Card";
import { Blog } from "@/Types/Blog";
import { GetAllBlogs } from "@/services/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ErrorMessage";

const Featured = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const GetFeaturedBlogs = async () => {
    try {
      const response = await GetAllBlogs();
      const data = response?.data?.data;
      if (!data) {
        toast.error("Data not found");
        return;
      }
      setBlogs(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    GetFeaturedBlogs();
  }, []);

  return (
    <section className="featured">
      <p className="featured-title">Featured Blogs</p>
      <div className="blogs">
        {blogs.slice(0, 3).map((b: Blog) => {
          return (
            <div key={b._id}>
              <Card id={b._id} title={b.title} desc={b.description} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Featured;
