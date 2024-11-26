'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import useUserStore from '@/services/zustand/userZustand/userStor';
import LoadingSpinner from '@/components/loading/loadingSpiner';
import Login from '@/components/Login/Login';
import Header from '@/components/header/Header';
import { Modal, Box } from '@mui/material'; // Import של Modal ו-Box

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

  return (
    <>
      <Header />
      {children}

      {/* modal להציג את ה-login כמודאל */}
      {!user && (
        <Modal
          open={true} // תצג את המודאל אם המשתמש לא מחובר
          onClose={() => {}}
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
