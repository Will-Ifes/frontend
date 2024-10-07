"use client";

import React, { useState } from "react";
import FormCreate from "./form-create";
import { useRouter } from "next/router";
import { createUser, CreateUserState } from "../../../../actions/user";

const CreateUserPage: React.FC = () => {
  const [error, setError] = useState<CreateUserState["error"]>();
  const router = useRouter();

  const handleCreateUser = async (data: {
    name: string;
    email: string;
    password: string;
    tenantId: number;
  }) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("tenantId", data.tenantId.toString());

    const result = await createUser({}, formdata);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/success"); // Redirecionar para uma página de sucesso ou outra página
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Usuário</h1>
        <FormCreate onSubmit={handleCreateUser} error={error} />
      </div>
    </div>
  );
};

export default CreateUserPage;
