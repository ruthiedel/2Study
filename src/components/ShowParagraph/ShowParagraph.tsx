'use client'
import React from 'react';
import { Typography, Box } from '@mui/material';
import { Paragraph } from '../../types';
import { Loading } from '..';

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

  const removeHtmlTags = (text: string) => {
    const parser = new DOMParser();
    const parsedText = parser.parseFromString(text, 'text/html').body.textContent || '';
    return parsedText;
  };

  return (
    <Box style={paragraphStyles.container}>
      <Typography style={paragraphStyles.title}>{chapterTitle}</Typography>
      <Typography style={paragraphStyles.text}>
        {paragraph && paragraph.text ? removeHtmlTags(paragraph.text) : <Loading/>}
      </Typography>
    </Box>
  );
};


export default ParagraphNavigation;
