import { useEffect, useState } from 'react'
import {  useParams } from "react-router-dom"
import axios from 'axios'
import ListingCard from '../../components/ListingCard'


const Category = props =>{
  let {category} = useParams()
  const [listingState, setListingState] = useState('')
  useEffect(() => {
    axios.get(`/api/categories/${category}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(listing => {
        console.log(listing.data[0].listings)
        setListingState(listing.data[0].listings)
      })
  }, [])
  return(
    <>
    <h1>category page for {category}</h1>
    {listingState ? (
        listingState.map((listing, index) => {
          return <ListingCard
            title={listing.title}
            imageURL={listing.imageURL}
            body={listing.body}
            seller={listing.seller.username}
            date={listing.datePosted}
            id={listing._id}
            isSold={listing.isSold} />
        }
    )) : null }
    </>
  )
}
export default Category