'use client';
import React from 'react';
import { Typography, Box } from '@mui/material';
import { Paragraph } from '../../types';
import Loading from '../LoadingFolder/Loading';
import styles from './ShowParagraph.module.css';
import {removeHtmlTags} from '../../lib/clientHelpers/removeHTMLTags'

type Props = {
  paragraph: Paragraph;
  chapterTitle: string;
};

const ParagraphNavigation: React.FC<Props> = (props) => {
  const { paragraph, chapterTitle } = props;
  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>{chapterTitle}</Typography>
      <Typography className={styles.text} component='div'>
        {paragraph && paragraph.text ? removeHtmlTags(paragraph.text) : <Loading />}
      </Typography>
    </Box>
  );
};

export default ParagraphNavigation;
