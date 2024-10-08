"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    } else {
      try {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          setLoading(false);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        router.push("/login");
      }
    }
  }, [router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full h-full flex justify-center bg-gray-100">
      {children}
    </div>
  );
};

export default ProtectedRoute;
