import react from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                    <Navbar.Brand as={Link} to="/ads">Mini Mobile</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/ads">All Ads</Nav.Link>
                        <Nav.Link as={Link} to="ads/new">Post Ad</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;

