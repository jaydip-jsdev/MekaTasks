"use client";

import React, { useState } from "react";
import "../login/login.css";
import { useRouter } from "next/navigation";
import { Register } from "@/server/services/api";
import ClientRoutes from "../../ClientRoutes";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/ErrorMessage";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const payload = {
        name,
        email,
        password,
      };

      const { data } = await Register(payload);

      if (data.success) {
        router.push(ClientRoutes.LOGINPAGE);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
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
