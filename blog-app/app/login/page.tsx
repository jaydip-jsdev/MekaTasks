"use client";

import React, { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import { Login } from "@/services/api";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const payload = {
        email,
        password,
      };

      const { data } = await Login(payload);

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
