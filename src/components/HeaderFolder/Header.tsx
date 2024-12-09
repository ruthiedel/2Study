'use client';

import React, { useState, MouseEvent, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Box, Dialog } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/pictures/logo1.png";
import styles from "./header.module.css";
import useUserStore from '../../services/zustand/userZustand/userStor';
import Login from "../Login/Login";

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const logout = useUserStore((state) => state.logout);
    const user = useUserStore((state) => state.user);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        if (user != null && showLogin)
            setShowLogin(false);
    }, [user])

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
                        <Link href="/" passHref>
                            <Image
                                src={logo}
                                alt="2Study Logo"
                                className={styles.logoImage}
                            />
                        </Link>
                    </div>

                    <div className={styles.navButtons}>
                        <Link href="/" className={styles.navButton}>
                            <Button className={styles.navText}>דף הבית</Button>
                        </Link>
                        <Link href="/about" className={styles.navButton}>
                            <Button className={styles.navText}>אודות</Button>
                        </Link>
                        <Link href="/bookCatalog" className={styles.navButton}>
                            <Button className={styles.navText}>קטלוג ספרים</Button>
                        </Link>
                    </div>

                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleMenuOpen}
                        className={styles.iconButton}
                    >
                        <AccountCircleIcon
                        sx={{
                            color: '#fff'
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
