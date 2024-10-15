'use client';

import React, { useEffect, useState } from 'react';
import FormLogin from './form-login';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../../actions/user';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const LoginUserPage: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          router.back(); // Redirecionar para a página privada se o token for válido
        } else {
          setLoading(false); // Token expirado, parar o carregamento
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setLoading(false); // Erro ao decodificar, parar o carregamento
      }
    } else {
      setLoading(false); // Sem token, parar o carregamento
    }
  }, [router]);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const result = await loginUser(data);
      Cookies.set('token', result.token, { expires: 1 }); // Armazenar o token nos cookies
      localStorage.setItem('user', JSON.stringify(result.user));
      router.push('/'); // Redirecionar para a página privada após login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login:', (error as Error).message);
      setError((error as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <FormLogin onSubmit={handleLogin} error={error} />
      </div>
    </div>
  );
};

export default LoginUserPage;
