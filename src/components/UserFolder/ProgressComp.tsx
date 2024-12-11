import * as React from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PeopleIcon from '@mui/icons-material/People';
import { Card, CardContent, ListItemIcon, Typography, List, ListItem, ListItemText } from "@mui/material";
import styles from './userStatus.module.css'
import { Wizard, PieCategories, BarGraph, BarsGraph } from '../../components'

export default function ProgressComp() {

  const steps = [
    <PieCategories/>,
    <BarGraph/>,
    <BarsGraph/>,
  ];

  return (
    <Card className={styles.mycard}>
      <CardContent style={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div" className="fontFamily">
          ההתקדמות שלך
        </Typography>
        <Wizard steps={steps} />
      </CardContent>
    </Card>
  );
}
