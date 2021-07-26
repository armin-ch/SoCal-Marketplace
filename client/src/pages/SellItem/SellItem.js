import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import ListingForm from '../../components/ListingForm'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from '../../components/DashBoard'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { useEffect, useState } from 'react'
import Listing from '../../utils/ListingAPI'
import React from 'react'
import Footer from '../../components/Footer'

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
    title: null,
    body: '',
    price: '',
    rent: false,
    sell: false,
    listings: [],
    errors: {
      title: ''
    }
  })
  const handleInputChange = ({ target }) => {
    setListingState({ ...listingState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
    const { name, value } = event.target
    let errors = listingState.errors
    switch (name) {
      case 'title':
        errors.title =
          value.length < 5
            ? 'Must enter a Title'
            : '';
        break;
      default:
        break;
    }
    event.preventDefault()
    const date = new Date().setDate(new Date().getDate() - 10)
    Listing.create({
      title: listingState.title,
      rent: listingState.rent,
      sell: listingState.sell,
      body: listingState.body,
      price: listingState.price,
      datePosted: date,
      errors: {
        title: ''
      }
    })
      .then(({ data: listing }) => {
        const listings = [...listingState.listings]
        listings.push(listing)
        setListingState({ errors, [name]: value })
      })
  }
  useEffect(() => {
    Listing.getAll()
      .then(({ data: listings }) => {
        console.log(listings)
        setListingState({ ...listingState, listings })
      })
  }, [])

  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  }

  const { errors } = listingState
  return (
    <div className={classes.root}>
      <Dashboard />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='xl' style={{ padding: '0px' }}>
          <Container maxWidth='xl' className='grid-bg ba-grid anim'>
      <h1>Post a Listing <AddAPhotoIcon color='primary'/></h1>
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
    <Footer />
    </Container>
    </Container>
     </main >
    </div >
  );
}

export default SellItem