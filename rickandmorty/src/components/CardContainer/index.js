import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import './style.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CardContainer(prop) {
  const classes = useStyles();
  //console.log(prop.info)
  return (
    <Card className={classes.root, prop.info.status}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={prop.info.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className="name-caracter">
            {prop.info.name}
          </Typography>
          <ul className="list-options">
            <li>
              <p className="item-title">Species</p>
              <p className="">{prop.info.species}</p>
            </li>
            <li>
              <p className="item-title">Gender</p>
              <p className="">{prop.info.gender}</p>
            </li>
            <li>
              <p className="item-title">Location Name</p>
              <p className="">{prop.info.location.name}</p>
            </li>
            <li>
              <p className="item-title">Status</p>
              <p className="">{prop.info.status}</p>
            </li>
            <li>
              <p className="item-title">Creation Date</p>
              <p className=""><Moment format="DD/MM/YYYY" >{prop.info.created}</Moment></p>
            </li>
          </ul>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}