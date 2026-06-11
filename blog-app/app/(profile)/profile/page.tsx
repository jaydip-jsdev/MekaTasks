"use client";

import React, { useEffect, useState } from "react";
import "./profile.css";
import Link from "next/link";
import Navbar from "../../components/global/Navbar/Navbar";
import { useRouter } from "next/navigation";
import Footer from "../../components/global/Footer/Footer";
import { Blog } from "@/Types/Blog";
import { DeleteBlog, GetMyBlogs, Logout } from "@/server/services/api";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ErrorMessage";
import ClientRoutes from "../../ClientRoutes";

const ProfilePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  const getMyBlogs = async () => {
    try {
      const { data } = await GetMyBlogs();
      const myBlogs = data?.data;
      if (!myBlogs) {
        toast.error("Blogs not found");
        return;
      }
      setBlogs(myBlogs);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await Logout();

      if (data.success) {
        router.push(ClientRoutes.LOGINPAGE);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DeleteBlog(id);
      if (response.status === 200) {
        toast.success("Deleted successfully");
        getMyBlogs();
      } else {
        toast.error("Something wrong");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
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
                <div className="blog-card" key={b._id}>
                  <div className="">
                    <Link href={"/blogs/" + b._id}>
                      <img src="/blog.webp" alt="" className="blog-cover" />
                    </Link>

                    <div className="my-blog-actions">
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
