import { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import ListingForm from '../../components/ListingForm'
import Listing from '../../utils/ListingAPI'

const Home = () => {
  const [listingState, setListingState] = useState({
    title: '',
    body: '',
    price:'',
    rent: false,
    sell: false,
    listings: []
  })

  const handleInputChange = ({ target }) => {
    setListingState({ ...listingState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
    event.preventDefault()
    const date =  new Date().setDate(new Date().getDate() - 10) 
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
        setListingState({ ...listingState, listings, title: '', rent: '',  sell: '',  body: '', price:'' })
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
        {
          listingState.listings.map(listing => (
            <Paper
              key={listing._id}
              elevation={3}
              style={{ padding: '20px', marginBottom: '20px' }}
            >
              <Typography variant='h4'>
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
                {listing.price}
              </Typography>
              <Typography variant='h6'>
                {listing.datePosted}
              </Typography>
              <Typography variant='h6'>
                Created by {listing.seller.username}
              </Typography>
            </Paper>
          ))
        }
      </Paper>
    </Container>
  )
}

export default Home