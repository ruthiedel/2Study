'use client';

import React, { ReactNode, useEffect, useState } from 'react';

import useUserStore from '../services/zustand/userZustand/userStor';
import { Loading, Login, Header, Footer } from '../components';
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
    if (user === undefined) {
      setIsChecking(true);
    } else {
      setIsChecking(false);
      if (!user) {
        setOpenModal(true);
      }
    }
  }, [user]);

  if (isChecking) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {children}
      <Footer/>
      {!user && (
        <div className={styles.modal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'transparent', 
              p: 0,
              boxShadow: 0,
            }}
          >
            <Login />
          </Box>
        </div>
      )}
    </>
  );
};

export default RequireAuth;
