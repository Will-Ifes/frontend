'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

const LoginSchema = z.object({
  email: z.string().email('Insira um email válido'),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
});

type FormData = z.infer<typeof LoginSchema>;

interface FormLoginProps {
  onSubmit: (data: FormData) => Promise<void>;
  error?: string;
}

export default function FormLogin({ onSubmit, error }: FormLoginProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Button type="submit" className="relative w-full">
              Login
              {error && (
                <span className="absolute top-11 flex items-center gap-2 text-red-500">
                  <AlertCircle size={16} /> {error}
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="mt-6 flex flex-col space-y-4">
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Não tem uma conta?{' '}
          </span>
          <Link
            href="/register"
            className="text-sm text-primary hover:underline"
          >
            Cadastre-se
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
