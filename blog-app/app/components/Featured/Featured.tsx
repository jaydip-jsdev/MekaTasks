import React from "react";
import "./Featured.css";
import { getAllBlogs } from "@/utils/getBlogs";

const Featured = async () => {
  const blogs = await getAllBlogs();

  return (
    <section className="featured">
      <p className="featured-title">Featured Blogs</p>
      <div className="blogs">
        {blogs?.slice(0, 3).map((b: any) => {
          return (
            <div className="card" key={b._id}>
              <img src="/blog.webp" className="blog-cover" alt="cover" />
              <div className="card-body">
                <h3 className="card-title">{b.title}</h3>
                <p className="card-description">{b.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Featured;
