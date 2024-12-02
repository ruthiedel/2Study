'use client'
import React from 'react';
import { Typography, Box } from '@mui/material';
import { Paragraph } from '../../types'; 

const paragraphStyles = {
    container: {
        width: '60%',
        padding: '24px',
        overflowY: 'auto' as const,
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
        textAlign: 'center' as const,
    },
    text: {
        lineHeight: 1.6,
        textAlign: 'justify' as const,
    },
};

type Props = {
    paragraph: Paragraph;
    chapterTitle: string;
};

const ParagraphNavigation: React.FC<Props> = (props) => {
    const { paragraph, chapterTitle } = props;
    console.log(paragraph,"ppppp")

    return (
        <Box style={paragraphStyles.container}>
            <Typography style={paragraphStyles.title}>{chapterTitle}</Typography>
            <Typography style={paragraphStyles.text}>
                {paragraph.text}
            </Typography>
        </Box>
    );
};

export default ParagraphNavigation;
