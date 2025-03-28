import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: unknown;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
