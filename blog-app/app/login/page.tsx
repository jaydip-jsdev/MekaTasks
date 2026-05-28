"use client";

import React, { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action="" className="login-form" onSubmit={handleLogin}>
      <div className="form-content">
        <h2 className="login-title">Login</h2>
        <div>
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
            <button className="login-page-btn" type="submit">
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
