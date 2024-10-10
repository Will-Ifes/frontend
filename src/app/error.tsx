// app/error.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Ocorreu um erro</h1>
      <p className="mb-8">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Tentar novamente
      </button>
      <button
        onClick={() => router.push('/')}
        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        Voltar para a página inicial
      </button>
    </div>
  );
}
