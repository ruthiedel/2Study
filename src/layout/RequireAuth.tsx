'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import useUserStore from '../services/zustand/userZustand/userStor';
import { Loading, Login } from '../components';
import { Box } from '@mui/material';
import styles from './modal.module.css';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const user = useUserStore((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setIsChecking(false);
    setOpenModal(!user);
  }, [user]);

  if (isChecking) {
    return <Loading />;
  }

  return (
    <>
      {children}
      {openModal && (
        <Login onClickDialog={()=>{}} />
      )}
    </>
  );
};

export default RequireAuth;
