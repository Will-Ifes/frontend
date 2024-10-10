'use client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Remover o token dos cookies
    Cookies.remove('token');

    // Remover o usuário do localStorage
    localStorage.removeItem('user');

    // Redirecionar para a página de login
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="flex items-center justify-center">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sair</span>
    </button>
  );
}
