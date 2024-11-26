'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/services/zustand/userZustand/userStor';
import LoadingSpinner from '@/app/compnents/loading/loadingSpiner';
import Login from '@/app/compnents/Login/Login';
// import Login from '@/app/login/page';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const user = useUserStore((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(false);
  }, [user]);

  if (isChecking) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // return <Login />;
    return <Login/>
  }

  return <>{children}</>;
};

export default RequireAuth;
