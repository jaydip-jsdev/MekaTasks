"use client";

import React, { useEffect, useState } from "react";
import "./profile.css";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer/Footer";
import { Blog } from "@/Types/Blog";
import { DeleteBlog, GetMyBlogs, Logout } from "@/services/api";

const ProfilePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  const getMyBlogs = async () => {
    try {
      const { data } = await GetMyBlogs();
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
      const { data } = await Logout();

      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { data } = await DeleteBlog(id);
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
