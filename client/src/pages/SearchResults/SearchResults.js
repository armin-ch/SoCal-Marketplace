import Typography from '@material-ui/core/Typography'
import ListingCard from '../../components/ListingCard'
import SearchInput from '../../components/searchInput'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Dashboard from '../../components/DashBoard'
import { useParams } from "react-router-dom"
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useEffect, useState } from 'react'
import Listing from '../../utils/ListingAPI'
import User from '../../utils/UserAPI'
import React from 'react'

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

const SearchResults = props => {
  let { search } = useParams()

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

  return (
    <div className={classes.root}>
      <Dashboard />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='xl' className='grid-bg ba-grid anim'>
            <SearchInput />
            <Grid container xs={12} sm={12} md={12} lg={12} spacing={2}>
              {
                listingState.listings.filter((val) => {
                  if (val.title.toLowerCase().includes(search.toLowerCase())) {
                    return val
                  }
                }).map(listing => {
                  return (
                    <Grid item xs={12} sm={12} md={4}>

                      <ListingCard
                        title={listing.title}
                        imageURL={listing.imageURL}
                        body={listing.body}
                        seller={listing.seller.username}
                        date={listing.datePosted}
                        id={listing._id}
                        isSold={listing.isSold}
                        buyer={listing.buyer}
                        showSellerInfo={false}
                        showRating={false}
                        datesold={listing.selldate}
                      />
                    </Grid>
                  )
                })
              }
            </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
export default SearchResults