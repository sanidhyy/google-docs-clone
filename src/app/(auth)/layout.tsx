import type { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return <div className="flex min-h-screen items-center justify-center">{children}</div>;
};

export default AuthLayout;
