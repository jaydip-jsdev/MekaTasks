import React from "react";
import "./Card.css";

const Card = ({ title, desc }: any) => {
  return (
    <div className="card">
      <img src="/blog.webp" className="blog-cover" alt="cover" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{desc.slice(0, 60)}...</p>
      </div>
    </div>
  );
};

export default Card;
