import ListingForm from '../../components/ListingForm'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from '../../components/DashBoard'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { useEffect, useState } from 'react'
import Listing from '../../utils/ListingAPI'
import React from 'react'

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

const SellItem = () => {
  const classes = useStyles();
  const [listingState, setListingState] = useState({
    title: '',
    body: '',
    price: '',
    rent: false,
    sell: false,
    listings: []
  })
  const handleInputChange = ({ target }) => {
    setListingState({ ...listingState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
    event.preventDefault()
    const date = new Date().setDate(new Date().getDate() - 10)
    Listing.create({
      title: listingState.title,
      rent: listingState.rent,
      sell: listingState.sell,
      body: listingState.body,
      price: listingState.price,
      datePosted: date
    })
      .then(({ data: listing }) => {
        const listings = [...listingState.listings]
        listings.push(listing)
        setListingState({ ...listingState, listings, title: '', rent: '', sell: '', body: '', price: '' })
      })
  }
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
    <Container maxWidth='xl'>
      <Paper component='div' style={{ backgroundColor: '#cfe8fc', minHeight: '80vh', padding: '20px', marginTop: '5vh' }}>
            <ListingForm
              title={listingState.title}
              rent={listingState.rent}
              sell={listingState.sell}
              body={listingState.body}
              price={listingState.price}
              datePosted={listingState.datePosted}
              handleInputChange={handleInputChange}
              handleCreatePost={handleCreatePost}
            />
      </Paper>
    </Container>
     </main >
    </div >
  );
}

export default SellItem