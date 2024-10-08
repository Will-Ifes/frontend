"use client";

import React, { useState } from "react";
import FormCreate from "./form-create";
import { useRouter } from "next/navigation";
import { createUser } from "../../../actions/user";

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
    formdata.append("email", data.email);
    formdata.append("nome", data.nome);
    formdata.append("cpf", data.cpf);
    formdata.append("empresa", data.empresa);
    formdata.append("funcao", data.funcao);
    formdata.append("telefone", data.telefone);
    formdata.append("senha", data.senha);
    formdata.append("confirmarSenha", data.confirmarSenha);

    const result = await createUser({}, formdata);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/success"); // Redirecionar para uma página de sucesso ou outra página
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-fit flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Usuário</h1>
        <FormCreate onSubmit={handleCreateUser} error={error} />
      </div>
    </div>
  );
};

export default CreateUserPage;
