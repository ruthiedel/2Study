import StudyComp from './StudyComp';
import ProgressComp from './ProgressComp';
import InfoComp from './InfoComp';
import React, { useEffect, useState } from 'react';
import Recommendations from './Recommendations';
import useUserStore from '../../services/zustand/userZustand/userStor';
import Loading from '../LoadingFolder/Loading';
import Login from '../Login/Login';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function UserContainer() {

  const user = useUserStore((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (user === undefined) {
      setIsChecking(true); 
    } else {
      setIsChecking(false); 
      setOpenModal(!user);
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
            <InfoComp />
          </div>
          <div>
            <StudyComp />
          </div>
        </div>

        <div className="">
          <ProgressComp />
        </div>
        <div>
            <Recommendations />
        </div>
      </div>
    </>
  );
}
