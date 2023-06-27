import {Container, Navbar, Button} from 'react-bootstrap';

import brand from '../img/nhs logo.jpg';
import './css/navigation.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

function TopBar(props) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    props.handleAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <Navbar bg="light" expand="lg" className='ml-auto'>
      <Container id='topBar'>
         <Navbar.Brand href="#home"><img src={brand} className = "brandImage" alt="NHS Northumbria Branding"/></Navbar.Brand>
        {props.authenticated === true ?
          <Button variant="primary" onClick={handleSignOut}>Logout</Button>
          :
          <LinkContainer to='/login'><Button variant="primary" >Login</Button></LinkContainer>
        }
        
      </Container>
    </Navbar>
  );
}

export default TopBar;
