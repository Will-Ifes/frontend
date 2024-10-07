"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Remover o token dos cookies
    Cookies.remove("token");

    // Remover o usuário do localStorage
    localStorage.removeItem("user");

    // Redirecionar para a página de login
    router.push("/api/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
