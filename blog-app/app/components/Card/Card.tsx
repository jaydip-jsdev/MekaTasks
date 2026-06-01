import React from "react";
import "./Card.css";
import Link from "next/link";
import ClientRoutes from "@/app/ClientRoutes";
import { Blog } from "@/Types/Blog";

interface CardProps {
  id: string;
  title: string;
  desc: string;
}

const Card = ({ id, title, desc }: CardProps) => {
  return (
    <div className="card">
      <Link href={ClientRoutes.BLOGDETAILS(id)}>
        <img src="/blog.webp" className="blog-cover" alt="cover" />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{desc.slice(0, 60)}...</p>
      </div>
    </div>
  );
};

export default Card;
