import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

export default function ProductCard({name, category, views, price, handleNavigate, imageSrc}) {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleNavigate}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={`http://localhost:8080/${imageSrc}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {description}
          </Typography> */}

          <Typography variant="h5" color="text.secondary">
            {price} KM
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px'}}>
        <Typography variant='p' sx={{background: '#1976d2', padding: '4px 10px', color: '#fff', borderRadius: '4px'}}>
            {category}
        </Typography>
        <Typography variant='p'>
            Broj pregleda: {views}
        </Typography>
      </CardActions>
    </Card>
  );
}