"use client";

import React, { useState } from "react";
import "../login/login.css";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" className="login-form" onSubmit={handleRegister}>
      <div className="form-content">
        <h2 className="login-title">Register</h2>
        <div>
          <div className="login-input-group">
            <label htmlFor="">Name</label>
            <input
              className="login-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="">Email</label>
            <input
              className="login-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="">Password</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-action">
            <button className="login-page-btn">Register</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
