'use client';

import React, { useState, MouseEvent } from "react";
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/pictures/logo1.png";
import styles from "./header.module.css";
import useUserStore from '../../services/zustand/userZustand/userStor';

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const logout = useUserStore((state) => state.logout);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = '#444';
        e.currentTarget.style.color = '#fff';
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = '';
        e.currentTarget.style.color = '';
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        setAnchorEl(null);
    };

    return (
        <AppBar position="static"
            style={{
                backgroundColor: '#1e1d1d',
                boxShadow: 'none',
                borderBottom: '2px solid #f5f5f5',
            }}>
            <Toolbar style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                direction: 'rtl',
            }}>

                <Box style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'gold',
                    fontFamily: '"Arial", sans-serif',
                }}>
                    <Link href="/" passHref>
                        <Image
                            src={logo}
                            alt="2Study Logo"
                            className={styles.logoImage}
                        />
                    </Link>
                </Box>

                <Box style={{
                    display: 'flex',
                    gap: '1rem',
                }}>
                    <Link href="/" passHref>
                        <Button style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            transition: 'background-color 0.3s ease',
                            fontFamily: '"2StudyFont", sans-serif',
                        }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}>דף הבית</Button>
                    </Link>
                    <Link href="/about" passHref>
                        <Button style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            transition: 'background-color 0.3s ease',
                            fontFamily: '"2StudyFont", sans-serif',
                        }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}>אודות</Button>
                    </Link>
                    <Link href="/bookCatalog" passHref>
                        <Button style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            borderRadius: '20px',
                            padding: '5px 15px',
                            transition: 'background-color 0.3s ease',
                            fontFamily: '"2StudyFont", sans-serif',
                        }}
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}>קטלוג ספרים</Button>
                    </Link>
                </Box>

                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleMenuOpen}
                    className={styles.iconButton}
                >
                    <AccountCircleIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    className={styles.menu}
                >
                    <Link href='/userDashboard' passHref><MenuItem onClick={handleMenuClose}>איזור אישי</MenuItem></Link>
                    <MenuItem onClick={handleLogout}>התנתקות</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
