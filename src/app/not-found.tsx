// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">404 - Página Não Encontrada</h1>
      <p className="mb-8">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link className="text-blue-500 hover:underline" href="/">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
