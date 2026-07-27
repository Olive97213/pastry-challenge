import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { auth } from '@/auth';

export default async function AccountLayout({
  children,
  auth: authSlot,
}: {
  children: ReactNode;
  auth: ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect('/profile');
  }

  return (
    <main className="from-primary/10 via-background to-secondary/10 min-h-screen bg-linear-to-br px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="w-full">{children}</div>
        <div className="grid gap-6 lg:grid-cols-2">{authSlot}</div>
      </div>
    </main>
  );
}
