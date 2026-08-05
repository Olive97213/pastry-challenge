import { LoginForm } from '@/app/login/page';
import { RegisterForm } from '@/app/register/page';

type Props = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
};

export default async function AuthSlotPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;
  const resolvedCallbackUrl =
    typeof callbackUrl === 'string' ? callbackUrl : callbackUrl?.[0];

  return (
    <>
      <LoginForm callbackUrl={resolvedCallbackUrl} />
      <RegisterForm callbackUrl={resolvedCallbackUrl} />
    </>
  );
}
