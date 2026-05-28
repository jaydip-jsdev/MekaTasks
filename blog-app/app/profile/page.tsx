"use client";

import React, { useEffect, useState } from "react";
import "./profile.css";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer/Footer";

type Blog = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const ProfilePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  const sanitizeHTML = (html: string) => {
    if (typeof window === "undefined") return html;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.innerHTML;
  };

  const getMyBlogs = async () => {
    try {
      const response = await fetch("/api/blog/my", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setBlogs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/blog/delete/" + id, {
        method: "DELETE",
        credentials: "include",
      });

      getMyBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <img src="/profile.webp" className="profile" alt="" />
        <h1 className="user-name">Peter Parker</h1>
        <p className="bio">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio earum
          ea quod atque quo veniam inventore doloremque ad nostrum sapiente,
          numquam dignissimos voluptas officiis hic voluptates placeat quos a
          quibusdam.
        </p>
        <div className="flex gap-4">
          <Link href={"/add"}>
            <button className="add-blog">Add Blog</button>
          </Link>
          <button className="add-blog" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div>
          <div className="blogs-wrapper">
            {blogs.map((b) => {
              return (
                <div className="blog-card relative" key={b._id}>
                  <div className="">
                    <Link href={"/blogs/" + b._id}>
                      <img src="/blog.webp" alt="" className="blog-cover" />
                    </Link>

                    <div className="my-blog-actions absolute right-2 bottom-2">
                      <Link href={"/edit/" + b._id}>
                        <button>Edit</button>
                      </Link>

                      <button onClick={() => handleDelete(b._id)}>
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="con">
                    <h1 className="blog-title">{b.title}</h1>
                    <p>
                      {b.description.replace(/<[^>]*>/g, "").slice(0, 60)}...
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
