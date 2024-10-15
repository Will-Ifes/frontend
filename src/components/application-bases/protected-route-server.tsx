import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Header from './header';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
      throw new Error('Token inválido');
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      throw new Error('Token expirado');
    }
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    redirect('/auth/login');
  }

  return (
    <>
      <Header />

      <main className="h-full w-full bg-gray-50">
        <div className="flex min-h-screen w-full justify-center bg-gray-100 px-8 py-12">
          {children}
        </div>
      </main>
    </>
  );
}
