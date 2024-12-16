'use client';

import React, { useState, MouseEvent, useEffect } from "react";
import { IconButton, Menu, MenuItem, Dialog } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import logo from "../../../public/pictures/logo1.png";
import styles from "./header.module.css";
import useUserStore from '../../services/zustand/userZustand/userStor';
import Login from "../Login/Login";
import { useRouter } from "next/navigation"; 

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const logout = useUserStore((state) => state.logout);
    const user = useUserStore((state) => state.user);
    const [showLogin, setShowLogin] = useState(false);
    const pathname = usePathname(); 
    const router = useRouter();

    useEffect(() => {
        if (user != null && showLogin)
            setShowLogin(false);
    }, [user]);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        setAnchorEl(null);
    };

    const handleLoginOpen = () => {
        setShowLogin(true);
        setAnchorEl(null);
    };

    const handleLoginClose = () => {
        setShowLogin(false);
    };

    return (
        <>
            <div className={styles.appBar}>
                <div className={styles.toolbar}>
                    <div className={styles.logo}>
                        <Link href="/bookCatalog" passHref>
                            <Image
                                src={logo}
                                alt="2Study Logo"
                                className={styles.logoImage}
                            />
                        </Link>
                    </div>

                    <div className={styles.navButtons}>

                        <Link href="/about" className={`${styles.navButton} ${pathname === '/about' ? styles.active : ''}`}>
                            <button className={styles.navText}>דף הבית</button>
                        </Link>
                        <Link href="/BooksLearning" className={`${styles.navButton} ${pathname === '/BooksLearning' ? styles.active : ''}`}>
                            <button className={styles.navText}>ספרים בלמידה</button>
                        </Link>
                        <Link href="/bookCatalog" className={`${styles.navButton} ${pathname === '/bookCatalog' ? styles.active : ''}`}>
                            <button className={styles.navText}>קטלוג ספרים</button>
                        </Link>
                    </div>

                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleMenuOpen}
                        className={styles.iconButton}
                        sx={{
                            marginLeft: '1rem',
                        }}
                    >
                        <AccountCircleIcon
                            sx={{

                                color: 'white',
                                fill: 'white',
                                backgroundColor: 'black',
                                borderRadius: '50%',
                            }}
                        />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        className={styles.menu}
                    >
                        <Link href='/userDashboard' passHref><MenuItem onClick={handleMenuClose}>איזור אישי</MenuItem></Link>
                        {user ? (
                            <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
                        ) : (
                            <MenuItem onClick={handleLoginOpen}>התחברות</MenuItem>
                        )}
                    </Menu>
                </div>
            </div>
            <Dialog open={showLogin} onClose={handleLoginClose}>
                <Login />
            </Dialog>
        </>
    );
};

export default Header;
