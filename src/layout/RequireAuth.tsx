'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import useUserStore from '@/services/zustand/userZustand/userStor';
import LoadingSpinner from '@/components/loading/loadingSpiner';
import Login from '@/components/Login/Login';

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
