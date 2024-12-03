'use client'
import React from 'react';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {Book} from '../../types'
import numberToGematria from '../../lib/clientHelpers/gematriaFunc'
import booksDetails from '@/hooks/booksDetails';

const sidebarStyles = {
    container: {
        width: '20%',
        backgroundColor: '#f5f5f5',
        height: '100vh',
        padding: '16px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    listItem: {
        borderRadius: '8px',
        marginBottom: '8px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e0e0e0',
        },
    },
    selected: {
        backgroundColor: '#d1c4e9',
        fontWeight: 'bold',
    },
};

interface SidebarProps {
    selectedBookId: string;
    onBookSelect: (bookId: string) => void;
}



const Sidebar: React.FC<SidebarProps> = ({ selectedBookId, onBookSelect }) => {
    // Fetch selected book data using React Query
    const { data: books, isLoading, error } = booksDetails();
    const [selectedBook,setSelectedBook] = React.useState<Book|null>(null)
    React.useEffect(() =>{
        if(books && selectedBookId){
            setSelectedBook(books.find(book => book._id === selectedBookId) ?? null);

        }
    },[])

    if (isLoading) {
        return (
            <div style={sidebarStyles.container}>
                <CircularProgress />
            </div>
        );
    }

    if (error || !selectedBook) {
        return (
            <div style={sidebarStyles.container}>
                <p>Error loading book or no book selected.</p>
            </div>
        );
    }

    return (
        <div style={sidebarStyles.container}>
            <List>
                {[...Array(selectedBook.chapters_num)].map((_, index) => (
                    <ListItem
                        key={index}
                        style={sidebarStyles.listItem}
                        // onClick={() => onBookSelect(selectedBook.id)}
                    >
                        <ListItemText primary={` ${numberToGematria(index + 1)} פרק`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
