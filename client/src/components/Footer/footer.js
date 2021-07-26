import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import './styles.css'

const Footer= props => {
  return (
    <Container id='footer1'>
      <Typography variant="body2" color="white" align="center" style={{ textDecoration: 'none', color:'white' }}>
        {'Copyright © '} Created By: 
        <Link href="https://github.com/armin-ch">
          Armin,
        </Link>{' '}
        <Link href="https://github.com/norrii1">
          Alex,
        </Link>{' '}
        <Link href="https://github.com/kyle004">
          Kyle,
        </Link>{' '}
        <Link href="https://github.com/wellswu4621">
          Wells,
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
}
export default Footer