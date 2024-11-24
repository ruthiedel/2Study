import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';   

import Typography from '@mui/material/Typography';

function ProductCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"   

        height="140"
        image="/path/to/image.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">   

          lizards are a widespread group of reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
      </CardContent>   

    </Card>
  );
}