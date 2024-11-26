'use client'

import React from 'react';
import Image from 'next/image'; 
import useUserStore from '@/services/zustand/userZustand/userStor'
import { User } from '@/types';
import { Card, CardMedia, Typography } from '@mui/material';
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';

const Information = () => {

    // const {user} : User = useUserStore
    
  return (
    <Card style={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        backgroundColor: 'white',
        maxWidth: '400px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#D4AF37', // צבע זהב
          borderRadius: '50%',
          padding: '10px',
          width: '80px',
          height: '80px',
        }}
      >
      <CardMedia
      component="img"
      image="defaultUser.png"
      alt="user"
      style={{
          objectFit: 'cover',
          borderRadius: '50%', 
          maxWidth: '50px',
          maxHeight: '50px',
        }}
    /></Box>
      {/* <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.books.sum(if(mark !== -1))}</p> */}
<Box
        style={{
          marginLeft: '20px',
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '10px',
          padding: '10px 20px',
          flexGrow: 1,
        }}
      >
        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          שם משתמש
        </Typography>
        <Typography style={{ marginBottom: '10px' }}>כתובת מייל</Typography>
        <Typography>מספר ספרים בלימוד: 5</Typography>
      </Box>
    </Card>
  );
}

export default Information;
