import * as React from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PeopleIcon from '@mui/icons-material/People';
import { Card, CardContent, Button, Link, ListItemIcon, Typography, List, ListItem, ListItemText } from "@mui/material";
import styles from './userStatus.module.css'

export default function ProgressCard() {
  return (
    <Card className={styles.mycard}>
      {/* <CardMedia
        component="img"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSLWVM0gEGq5ao5lDxgbYoCn0FyE5Ejkwig&s"
        alt="green iguana"
      /> */}
      <CardContent style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
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
