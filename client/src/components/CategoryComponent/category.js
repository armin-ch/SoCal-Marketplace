import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ListItemText from '@material-ui/core/ListItemText'
import Accordion from '@material-ui/core/Accordion'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CategoryComponent() {
  const classes = useStyles();

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ListItemText primary='Categories' style={{ textDecoration: 'none', color: 'black' }}/>
        </AccordionSummary>
        <List component="idk" className={classes.root} aria-label="mailbox folders">
          <Link to='/category/pets' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemText primary="Pets" />
            </ListItem>
          </Link>
          <Link to='/category/electronics' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemText primary="Electronics" />
            </ListItem>
          </Link>
          <Link to='/category/home_goods' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemText primary="Home Goods" />
            </ListItem>
          </Link>
          <Link to='/category/vehicles' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemText primary="Vehicles" />
            </ListItem>
          </Link>
          <Link to='/category/clothes' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button>
              <ListItemText primary="Clothes" />
            </ListItem>
          </Link>
          {/* <Divider /> */}
        </List>
        {/* <List>
        <MenuItem value={10} button divider>Pets</MenuItem>
        <MenuItem value={20} button divider>Electronics</MenuItem>
        <MenuItem value={30} button divider>Home Goods</MenuItem>
        </List> */}
      </Accordion>
    </div>
  );
}

{/* <MenuItem value="">
                 <em>None</em>
               </MenuItem>
               <MenuItem value={10}>Pets</MenuItem>
               <MenuItem value={20}>Electronics</MenuItem>
               <MenuItem value={30}>Home Goods</MenuItem> */}