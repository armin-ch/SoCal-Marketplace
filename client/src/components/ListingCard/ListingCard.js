import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import BuyerInputModal from '../BuyerInputModal';
import { Link } from 'react-router-dom'
import axios from 'axios'
import React from "react";
import { PromiseProvider } from 'mongoose';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const [value, setValue] = React.useState(props.rating);
  const classes = useStyles();
  let datePosted = JSON.stringify(props.date)
  datePosted = datePosted.slice(1, 11)
  let selldate = JSON.stringify(props.datesold)
  selldate = selldate.slice(1, 11)

  const handleUpdateRating = (value, id) => {
    axios.put(`/api/listings/${id}`, { rating: value }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: listing }) => {
        if (props.rating < 0){
          console.log(listing)
          const newNumRatings = listing.seller.numratings + 1
          const newRating = ((listing.seller.rating + value)/newNumRatings)
          axios.put(`/api/users/${listing.seller.username}`, { rating: newRating, newNumRatings }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(rating => {
            console.log(rating)
            setValue(value)
          })
        }
        else {
          console.log(listing)
          setValue(value)
        }
      })
      .catch(err => console.log(err))
  }
  const deleteListing = id => {
    axios.delete(`/api/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        console.log('listing removed')
        alert('Listing removed')
      })
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
          Created by <Link to={`/profile/${props.seller}`}> {props.seller}</Link> on {datePosted}
        </Typography>
        {props.isSold ? (
          <div>
            <Typography gutterBottom variant="body3" component="body3">
              Sold to <Link to={`/profile/${props.buyer}`}> {props.buyer}</Link> on {selldate}
            </Typography>
            <Typography variant="h2" color="textSecondary" component="p">
              sold
            </Typography>
          </div>
        ) : null}
      </CardContent>
      {props.showSellerInfo ? (
        <CardActions>
          <BuyerInputModal
            id={props.id}
          />
          <Button onClick={() => markSold(props.id)} size="small" color="primary">
            {props.isSold ? '' : 'Mark AS Sold'}
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
      {props.showRating ? (
        <Box component="fieldset" mb={3} borderColor="transparent">
          {(props.rating >= 0) ? (
            <Typography component="legend">Your Rating</Typography>
          ) : (
            <Typography component="legend">Please Rate this Transaction</Typography>
          )}
          <Rating
            name="simple-controlled"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => handleUpdateRating(newValue, props.id)}
          />
        </Box>

      ) : null}
    </Card>
  );
}