'use client';
import React from 'react';
import styles from './ShowParagraph.module.css';
import { Paragraph } from '../../types';
import {Loading} from '../index';
import { removeHtmlTags } from '../../lib/clientHelpers/removeHTMLTags';

type Props = {
  paragraph: Paragraph;
  chapterTitle: string;
};

const ParagraphNavigation: React.FC<Props> = ({ paragraph, chapterTitle }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{chapterTitle}</h2>
      <div className={styles.text}>
        {paragraph && paragraph.text ? removeHtmlTags(paragraph.text) : <Loading />}
      </div>
    </div>
  );
};

export default ParagraphNavigation;
