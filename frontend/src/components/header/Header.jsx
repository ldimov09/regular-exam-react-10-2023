import { useContext } from 'react';
import { Button, NavItem, NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

function Header() {
	const {
		isAuthenticated,
		username,
	} = useContext(AuthContext);

	return (
		<Navbar expand="lg" bg="light" data-bs-theme="light" style={{borderBottom: "1px solid #212329"}}>
			<Container>
				<Navbar.Brand href="#home">Game Harbor</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
					<Nav className="me-auto">
						{isAuthenticated ? (<NavLink> Welcome, {username}</NavLink>) : ''}
						<NavLink to="/" as={Link}>Home</NavLink>
						<NavLink to="/catalog" as={Link}>Boardgames</NavLink>
						{isAuthenticated && (
							<>
								<NavLink to="/logout" as={Link}>Logout</NavLink>
								<Button  to="/create" className='btn btn-dark ms-2' as={Link}>Create</Button>
							</>
						)}
						{!isAuthenticated && (
							<>
								<NavLink to="/login" as={Link}>Login</NavLink>
								<Button to="/register" className='btn btn-dark ms-2' as={Link}>Register</Button>
							</>
						)}

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;