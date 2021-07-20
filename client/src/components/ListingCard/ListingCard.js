import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  datePosted = datePosted.slice(1,11)

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
            created by {props.seller} on {datePosted}
          </Typography>
        </CardContent>
      <CardActions>
        <Button onClick={event => window.location.href = `/profile/${props.seller}`} size="small" color="primary">
          Contact Seller
        </Button>
        <Button onClick={event => window.location.href = `/listing/${props.id}`} size="small" color="primary">
          Show More
        </Button>
      </CardActions>
    </Card>
  );
}