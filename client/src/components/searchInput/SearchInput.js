import { Button, TextField, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      width: '25ch',
    },
  },
}));

export default function ColorTextFields() {
  const classes = useStyles();

  const [searchState, setsearchState] = React.useState('');
  // const handleSearch = (event) => {
  //   event.preventDefault()
  //   if (event.target.charCode === 13){
  //     console.log(event)
  // }

  return (
    <FormControl className={classes.root} noValidate autoComplete="off">
      <Grid direction='row'>
      <TextField
        id="outlined-secondary"
        label="Search"
        variant="outlined"
        color="secondary"
        onChange={event => {setsearchState(event.target.value)}}
        // onKeyPress={event => {handleSearch(event)}}
        />
      <Button id="myBtn" class='drawer11' onClick={event => window.location.href = `/search/${searchState}`} size="small">
      <SearchIcon
      color="primary"/>
      </Button>
      </Grid>
    </FormControl>
  );
}