"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [activationCode, setActivationCode] = React.useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, activationCode }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar");
      }

      router.push("/login");
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <h1 className="text-2xl mb-4">Register Page</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Activation Code"
          value={activationCode}
          onChange={(e) => setActivationCode(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleRegister}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
