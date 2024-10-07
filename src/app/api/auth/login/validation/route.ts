import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { getUserByEmail } from "../../../../../actions/user";

const loginSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedCredentials = loginSchema.safeParse(body);

    if (!parsedCredentials.success) {
      console.error("Credenciais inválidas:", parsedCredentials.error);
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 400 }
      );
    }

    const { email, password } = parsedCredentials.data;

    // Buscar o usuário pelo email
    let user;
    try {
      user = await getUserByEmail(email);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return NextResponse.json(
        { message: "Erro ao buscar usuário" },
        { status: 500 }
      );
    }

    if (!user) {
      console.error("Usuário não encontrado:", email);
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Adicionar logs para depuração
    console.log("Senha fornecida:", password);
    console.log("Senha armazenada:", user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Gerar token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Autenticação bem-sucedida
      return NextResponse.json(
        { message: "Login bem-sucedido", token, user },
        { status: 200 }
      );
    } else {
      // Falha na autenticação
      console.error("Falha na autenticação: Senha incorreta");
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json(
      { message: "Erro ao fazer login" },
      { status: 500 }
    );
  }
}
