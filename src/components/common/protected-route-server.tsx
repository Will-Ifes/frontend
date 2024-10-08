import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

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
    <div className="flex w-full justify-center bg-gray-100 min-h-[40rem]">
      {children}
    </div>
  );
}
