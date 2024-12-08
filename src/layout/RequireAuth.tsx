'use client';

import React, { ReactNode } from 'react';
import {  Header, Footer } from '../components';
import styles from './modal.module.css';
interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

const RequireAuth = ({ children }: RequireAuthProps) => {

  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  );
};

export default RequireAuth;
