'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import useUserStore from '@/services/zustand/userZustand/userStor';
import LoadingSpinner from '@/components/loading/loadingSpiner';
import Login from '@/components/Login/Login';
import Header from '@/components/header/Header';
import { Modal, Box } from '@mui/material';

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
       
      {!user &&(
      <Modal
        open={openModal} // פתח את המודאל רק אם המשתמש לא מחובר
        onClose={()=>{}} // סגור את המודאל
        aria-labelledby="modal-login"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'transparent', // הופך את הרקע לטרנפרנטי
            p: 0, // מסיר padding
            boxShadow: 0, // מסיר הצללה מה-box
            outline: 'none', // מונע קווים חיצוניים מסביב
          }}
        >
          <Login />
        </Box>
      </Modal>
      )}
    </>
  );
};

export default RequireAuth;
