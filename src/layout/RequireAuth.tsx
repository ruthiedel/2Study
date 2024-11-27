'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import useUserStore from '@/services/zustand/userZustand/userStor';
import LoadingSpinner from '@/components/loading/loadingSpiner';
import Login from '@/components/login/login';
import Header from '@/components/header/Header';
import { Box } from '@mui/material'; // Import של Modal ו-Box
import styles from './modal.module.css';
import ContactForm from '@/components/footer/footer'; 


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
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      {children}
      <ContactForm/>
      {!user && (
        <div className={styles.modal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'transparent', // הופך את הרקע לטרנפרנטי
              p: 0, // מסיר padding
              boxShadow: 0, // מסיר הצללה מה-box,
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
