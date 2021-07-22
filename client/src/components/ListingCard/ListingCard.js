import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import axios from 'axios'
import React from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  let datePosted = JSON.stringify(props.date)
  datePosted = datePosted.slice(1, 11)
  const deleteListing = id =>{
    axios.delete(`/api/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() =>{
      console.log('listing removed')
      alert('Listing removed')
    })
  }

  const markSold = id => {
    axios.put(`/api/listings/${id}`, { isSold: true }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    } )
      .then(() => {
        console.log('listing marked as sold')
        alert('Listing marked as sold')
      })
      .catch(err=>console.log(err))
  }


  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.imageURL}
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.body}
        </Typography>
        <Typography gutterBottom variant="body3" component="body3">
          created by <Link to={`/profile/${props.seller}`}> {props.seller}</Link> on {datePosted}
        </Typography>
      </CardContent>
      {props.showSellerInfo ? (
        <CardActions>
          <Button onClick={() => markSold(props.id)} size="small" color="primary">
            Mark As sold
        </Button>
          <Button onClick={() => deleteListing(props.id)} size="small" color="secondary">
            Delete Listing
        </Button>
        </CardActions>
      ) : (
        <CardActions>
          <Button onClick={event => window.location.href = `/profile/${props.seller}`} size="small" color="primary">
            Contact Seller
        </Button>
          <Button onClick={event => window.location.href = `/listing/${props.id}`} size="small" color="primary">
            Show More
        </Button>
        </CardActions>
      )}
    </Card>
  );
}