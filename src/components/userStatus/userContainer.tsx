import React, { useEffect, useState } from 'react';
import StudyCard from './studyCard';
import ProgressCard from './progressCard';
import Information from './information';
import Recommendations from './Recommendations';
import useUserStore from '../../services/zustand/userZustand/userStor';
import Loading from '../Login/Login';
import Login from '../Login/Login';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function UserContainer() {
  const user = useUserStore((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (user === undefined) {
      setIsChecking(true); // במצב של בדיקה
    } else {
      setIsChecking(false); // סיום הבדיקה
      setOpenModal(!user); // פתיחת ה-popup אם המשתמש לא מחובר
    }
  }, [user]);

  if (isChecking) {
    return <Loading />;
  }

  return (
    <>
      <Modal
        open={openModal}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-description"
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } }}
      >
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
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 m-8">
        <div>
          <div>
            <Information />
          </div>
          <div>
            <StudyCard />
          </div>
        </div>

        <div>
          <div>
            <Recommendations />
          </div>
          <div>
            <ProgressCard />
          </div>
        </div>
      </div>
    </>
  );
}
