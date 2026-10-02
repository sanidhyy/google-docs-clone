import type { PropsWithChildren } from 'react';

import { AuthGate } from '@/components/auth-gate';

const MainLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return <AuthGate>{children}</AuthGate>;
};

export default MainLayout;
