// app/error.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Ocorreu um erro</h1>
      <p className="mb-8">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Tentar novamente
      </button>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Voltar para a página inicial
      </button>
    </div>
  );
}