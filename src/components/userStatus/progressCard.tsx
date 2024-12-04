import * as React from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PeopleIcon from '@mui/icons-material/People';
import { Card, CardContent, ListItemIcon, Typography, List, ListItem, ListItemText } from "@mui/material";
import styles from './userStatus.module.css'
import { getBookCategoriesCount, getBooksProgress } from '../../lib/clientHelpers/graphsFunctions'
import { getBooks } from '../../hooks/booksDetails';

export default function ProgressCard() {
  const { data: books } = getBooks();

if (books && books.length > 0){
  console.log('test: ')
  console.log(getBookCategoriesCount(books));
}

  return (
    <Card className={styles.mycard}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" className="fontFamily">
          ההתקדמות שלך
        </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="גרף על פי נושאים" />
            </ListItem>
            <ListItem>
                <ListItemIcon><ForwardToInboxIcon /></ListItemIcon>
              <ListItemText primary="גרף התקדמות" />
            </ListItem>
            <ListItem>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText primary="אתה מול אחרים" />
            </ListItem>
          </List>
      </CardContent>
    </Card>
  );
}
