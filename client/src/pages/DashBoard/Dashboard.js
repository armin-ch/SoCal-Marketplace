import { useEffect, useState } from 'react'
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications'
import SearchInput from '../../components/searchInput';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem'
import Listing from '../../utils/ListingAPI'
import ListItems from '../../components/ListItems'
import ListingCard from '../../components/ListingCard'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Created by Armin, Alex, Kyle, & Wells
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [listingState, setListingState] = useState({
  title: '',
  body: '',
  price: '',
  rent: false,
  sell: false,
  listings: []
})
  useEffect(() => {
    Listing.getAll()
      .then(({ data: listings }) => {
        console.log(listings)
        setListingState({ ...listingState, listings })
      })
  }, [])

  
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
    <ListItems />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='xl'>
          <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh' }}>
            
            {
              listingState.listings.map(listing => (
                <Paper
                  key={listing._id}
                  elevation={3}
                  style={{ padding: '20px', marginBottom: '20px' }}
                >
                  {/* <Typography variant='h4'>
                    {listing.title}
                  </Typography>
                  <Typography variant='p'>
                    {listing.rent}
                  </Typography>
                  <hr />
                  <Typography variant='h6'>
                    {listing.sell}
                  </Typography>
                  <Typography variant='h6'>
                    {listing.body}
                  </Typography>
                  <Typography variant='h6'>
                    $ {listing.price}
                  </Typography>
                  <Typography variant='h6'>
                    {listing.datePosted}
                  </Typography>
                  <Typography variant='h6'>
                    Created by @{listing.seller.username}
                  </Typography>
                  <img src={listing.imageURL} alt={listing.title} /> */}
                  <ListingCard
                    title={listing.title}
                    imageURL={listing.imageURL}
                    body={listing.body}
                    seller={listing.seller.username}
                    date={listing.datePosted}
                  />
                </Paper>
              ))
            }
          </Paper>
            
        </Container>
      </main>
    </div>
  );
}