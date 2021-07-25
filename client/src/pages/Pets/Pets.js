import ListingCard from '../../components/ListingCard'
import Container from '@material-ui/core/Container'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Pets = props => {
  let { category } = useParams()
  const [listingState, setListingState] = useState('')
  useEffect(() => {
    axios.get(`/api/categories/pets`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(listing => {
        console.log(listing.data[0].listings)
        setListingState(listing.data[0].listings)
      })
  }, [])
  return (
    <>
      <h1>category page for {category}</h1>
      <Grid container spacing={3}>
        {listingState ? (
          listingState.map((listing, index) => {
            return (
              <Grid item xs={3}>
                <ListingCard
                  title={listing.title}
                  imageURL={listing.imageURL}
                  body={listing.body}
                  seller={listing.seller.username}
                  date={listing.datePosted}
                  id={listing._id}
                  isSold={listing.isSold} />
              </Grid>
            )
          }
          )) : null}
      </Grid>
    </>
  )
}
export default Pets