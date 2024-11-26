'use client';

import React, { useState, MouseEvent } from "react";
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import Image from "next/image";
import logo from "@/pictures/צילום מסך 2024-11-24 141224 (1).png";
import styles from "./header.module.css";

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar className={styles.toolbar}>

                <Box className={styles.logo}>
                    <Link href="/" passHref>
                        <Image
                            src={logo}
                            alt="2Study Logo"
                            className={styles.logoImage}
                        />
                    </Link>
                </Box>

                <Box className={styles.navButtons}>
                    <Link href="/" passHref>
                        <Button className={styles.navButton}>דף הבית</Button>
                    </Link>
                    <Link href="/about" passHref>
                        <Button className={styles.navButton}>אודות</Button>
                    </Link>
                    <Link href="/catalog" passHref>
                        <Button className={styles.navButton}>קטלוג ספרים</Button>
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
                    <MenuItem onClick={handleMenuClose}>איזור אישי</MenuItem>
                    <MenuItem onClick={handleMenuClose}>התנתקות</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
