"use client";

import { register } from "@/lib/axios/api";
import { getErrorMessage } from "@/lib/errorHandling/ClientError";
import routes from "@/lib/ClientRoutes/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await register(payload);

      if (response.status === 201) {
        router.push(routes.LOGINPAGE);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={HandleRegister}>
        <div className="form">
          <div className="form-header">
            <h1 className="login-title">Register Page</h1>
          </div>
          <div className="form-body">
            <div>
              <label htmlFor="">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">password:</label>
              <input
                type="password"
                name="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-action">
              <button>Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
