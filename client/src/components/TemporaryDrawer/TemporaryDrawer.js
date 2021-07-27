import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItems from '../ListItems'
import React from 'react'
import clsx from 'clsx'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid';
import { Button, TextField, FormControl } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})


export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const[searchState, setsearchState] = React.useState('');
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown') {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <FormControl className={classes.root} noValidate autoComplete="off">
        <Grid direction='row'>
          <TextField
            id="outlined-secondary"
            label="Search"
            variant="outlined"
            color="secondary"
            onChange={event => { setsearchState(event.target.value) }}
          // onKeyPress={event => {handleSearch(event)}}
          />
          <Button id="myBtn2" class='drawer11' onClick={event => window.location.href = `/search/${searchState}`} size="small">
            <SearchIcon
              color="primary" />
          </Button>
        </Grid>
      </FormControl>
      <List>
        <SearchInput/>
        <ListItems />
      </List>
    </div>
  );

  return ( 
    <div>

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}