import { User } from '../types/users';
import { z } from 'zod';

const UseSchema = z.object({
  id: z.string(),
  email: z.string().email('Insira um email válido'),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  image: z.string(),
  role: z.string(),
  tenantId: z.number().nonnegative('O ID da empresa deve ser um número não negativo'),
});

export const CreateUser = UseSchema.omit({ id: true, image: true, role: true });

export type CreateUserState = {
  error?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function createUser(state: CreateUserState, formdata: FormData) {
  const validateFields = CreateUser.safeParse({
    name: formdata.get('name'),
    email: formdata.get('email'),
    password: formdata.get('password'),
  });

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
      message: 'Preencha todos os campos',
    };
  }

  if (validateFields.success) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formdata)),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Erro ao criar usuário:', errorText);
        throw new Error(`Erro ao criar usuário: ${errorText}`);
      }

      const user = await res.json();
      return user;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error(
        `Erro ao criar usuário: ${(error as { message: string })?.message}`,
      );
    }
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Erro ao buscar usuário:', errorText);
      throw new Error(`Erro ao buscar usuário: ${errorText}`);
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.error('Erro durante a busca do usuário:', error);
    throw new Error(
      `Erro durante a busca do usuário: ${(error as { message: string })?.message}`,
    );
  }
}

export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }

  const result = await response.json();
  return result;
}

export async function authenticate(
  state: string | undefined,
  formdata: FormData,
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formdata)),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Erro ao fazer login:', errorText);
      throw new Error(`Erro ao fazer login: ${errorText}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error(
      `Erro ao fazer login: ${(error as { message: string })?.message}`,
    );
  }
}
