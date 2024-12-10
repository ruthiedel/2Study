import * as React from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PeopleIcon from '@mui/icons-material/People';
import { Card, CardContent, ListItemIcon, Typography, List, ListItem, ListItemText } from "@mui/material";
import styles from './userStatus.module.css'
import { Wizard, PieCategories } from '../../components'

export default function ProgressComp() {

  const steps = [
    <PieCategories/>,
    <div key={1}>
      <h2>שלב 1: פרטי משתמש</h2>
      <form>
        <label>
          שם:
          <input type="text" />
        </label>
      </form>
    </div>,
    <div key={2}>
      <h2>שלב 2: פרטי כתובת</h2>
      <form>
        <label>
          עיר:
          <input type="text" />
        </label>
      </form>
    </div>,
    <div key={3}>
      <h2>שלב 3: פרטי תשלום</h2>
      <form>
        <label>
          כרטיס אשראי:
          <input type="text" />
        </label>
      </form>
    </div>,
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
