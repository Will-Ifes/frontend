"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useCallback } from "react";

export const useHandleLogout = () => {
  const route = useRouter();

  return useCallback(async () => {
    console.log("Cheguei");
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      // Remover o token dos cookies
      Cookies.remove("token");

      // Remover o usuário do localStorage
      localStorage.removeItem("user");

      // Redirecionar para a página de login
      route.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Você pode querer mostrar uma mensagem de erro ao usuário aqui
    }
  }, [route]);
};
