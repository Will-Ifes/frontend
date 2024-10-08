'use client';

import React, { useState } from 'react';
import FormCreate from './form-create';
import { useRouter } from 'next/navigation';
import { createUser } from '../../../actions/user';
import { loginUser } from '../../../actions/user';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const CreateUserPage: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const handleCreateUser = async (data: {
    email: string;
    nome: string;
    cpf: string;
    empresa: string;
    funcao: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
  }) => {
    const formdata = new FormData();
    formdata.append('email', data.email);
    formdata.append('nome', data.nome);
    formdata.append('cpf', data.cpf);
    formdata.append('empresa', data.empresa);
    formdata.append('funcao', data.funcao);
    formdata.append('telefone', data.telefone);
    formdata.append('senha', data.senha);
    formdata.append('confirmarSenha', data.confirmarSenha);

    const result = await createUser({}, formdata);

    if (result?.error) {
      setError(result.error);
    } else {handleCreateUser
      router.push('/success'); // Redirecionar para uma página de sucesso ou outra página
    }
  };

  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
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

  // const handleLogin = async (data: { email: string; password: string }) => {
  //   try {
  //     const result = await loginUser(data);
  //     Cookies.set('token', result.token, { expires: 1 }); // Armazenar o token nos cookies
  //     localStorage.setItem('user', JSON.stringify(result.user));
  //     router.push('/'); // Redirecionar para a página privada após login bem-sucedido
  //   } catch (error) {
  //     console.error('Erro ao fazer login:', (error as Error).message);
  //     setError((error as Error).message);
  //   }
  // };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-fit flex-col justify-center">
        <h1 className="mb-6 text-center text-2xl font-bold">Criar Usuário</h1>
        <FormCreate onSubmit={handleCreateUser} error={error} />
      </div>
    </div>
  );
};

export default CreateUserPage;
