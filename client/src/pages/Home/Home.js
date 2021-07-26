import Typography from '@material-ui/core/Typography'
import ListingCard from '../../components/ListingCard'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Dashboard from '../../components/DashBoard'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useEffect, useState } from 'react'
import Listing from '../../utils/ListingAPI'
import User from '../../utils/UserAPI'
import React from 'react'
import Footer from '../../components/Footer'



function Copyright() {
  return (
    <Container>
    <Typography variant="body2" color="textSecondary" align="center" style={{ opacity: '100%'}}>
      {'Copyright © '} Created By: 
      <Link color="black" href="https://github.com/armin-ch">
        Armin, 
      </Link>{' '}
      <Link color="black" href="https://github.com/norrii1">
       Alex,
      </Link>{' '}
      <Link color="black" href="https://github.com/kyle004">
        Kyle,
      </Link>{' '}
      <Link color="black" href="https://github.com/wellswu4621">
        Wells,
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </Container>
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

const Home = props => {
  const [meState, setMeState] = useState({
    me: {},
    isLoggedIn: true
  })

  const getMe = () => {
    User.me()
      .then(({ data: me }) => {
        if (me) {
          setMeState({ me, isLoggedIn: true })
        } else {
          getMe()
        }
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setMeState({ me: {}, isLoggedIn: false })
    window.location = '/login'
  }

  useEffect(() => {
    getMe()
  }, [])

  const updateMe = () => {
    User.me()
      .then(({ data: me }) => {
        console.log(me)
        setMeState({ me, isLoggedIn: true })
      })
      .catch(err => {
        console.error(err)
        setMeState({ ...meState, isLoggedIn: false })
      })
  }
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
        <Container maxWidth='xl' style={{ padding: '0px' }}>
        <Container maxWidth='xl' className='grid-bg ba-grid anim'>
          <h1>Listings Posted Recently</h1>
            <Grid container xs={12} sm={12} md={12} lg={12} spacing={2}>

              {
                listingState.listings.map(listing => {
                  if (!listing.isSold) {
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

                  }
                })
              }
            </Grid>
        <Footer />
  </Container>
        </Container>
      </main>
    </div>
  );
}
export default Home