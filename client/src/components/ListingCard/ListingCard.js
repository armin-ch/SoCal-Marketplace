import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'
import BuyerInputModal from '../BuyerInputModal'
import Button from '@material-ui/core/Button'
import Rating from '@material-ui/lab/Rating'
import Card from '@material-ui/core/Card'
import { Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import React from "react"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
});

export default function MediaCard(props) {
  const [value, setValue] = React.useState(props.rating);
  const classes = useStyles();
  let hasUpdated = false
  let datePosted = JSON.stringify(props.date)
  datePosted = datePosted.slice(1, 11)
  let selldate = JSON.stringify(props.datesold)
  if (props.isSold) {
    selldate = selldate.slice(1, 11)
  }

  const handleUpdateRating = (value, id) => {
    if (props.rating >= 0) { hasUpdated = true }
    axios.put(`/api/listings/${id}`, { rating: value }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data: listing }) => {
        console.log(listing)
        axios.get(`/api/users/id/${listing.seller}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(({ data: user }) => {
            console.log(user)
            let newNumRatings = user.numratings
            let newRating = user.rating
            if (!hasUpdated && listing.rating < 0) {
              console.log('number incremented')
              newNumRatings = (newNumRatings + 1)
              newRating = (((newRating) * user.numratings) + value) / newNumRatings
            }
            else {
              newRating = ((((newRating)*newNumRatings)-listing.rating)+value)/newNumRatings
            }
            axios.put(`/api/users/${user.username}`, { rating: newRating, numratings: newNumRatings }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(rating => {
                console.log(newRating)
                console.log(rating)
                setValue(value)
              })
          })
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
          {props.isSold ? (null) : (
            <BuyerInputModal
              id={props.id}
            />
          )}
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
          <Typography component="legend">
            {(props.rating >= 0) ? 'Your Rating' : 'This transaction has no rating yet'}
          </Typography>
          {props.updateRating ? (
            <Rating
              name="simple-controlled"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => handleUpdateRating(newValue, props.id)}
            />
          ) : (
            <Rating
              name="read-only"
              value={value}
              precision={0.5}
              readOnly
            />
          )}
        </Box>

      ) : (null)}
    </Card>
  );
}