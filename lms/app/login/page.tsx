"use client";

import { login } from "@/lib/axios/api";
import routes from "@/lib/ClientRoutes/route";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await login(payload);
      const user = response.data.user;

      if (response.status === 200) {
        if (user.role === "admin") {
          router.push(routes.ADMIN_DASHBOARD);
        } else {
          router.push(routes.HOMEPAGE);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form">
          <div className="form-header">
            <h1 className="login-title">Login Page</h1>
          </div>
          <div className="form-body">
            <div>
              <label htmlFor="">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-action">
              <button>Login</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
