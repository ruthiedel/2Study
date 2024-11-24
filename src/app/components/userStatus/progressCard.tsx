import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from '@mui/icons-material/BarChart';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PeopleIcon from '@mui/icons-material/People';
import { Button, Link, ListItemIcon } from "@mui/material";

export default function ProgressCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Typography variant="body2" color="text.secondary">
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
        </Typography>
        <Link href="#" underline="none">GO</Link>
        <Button href="#">GO2</Button>
      </CardContent>
       
    </Card>
  );
}
