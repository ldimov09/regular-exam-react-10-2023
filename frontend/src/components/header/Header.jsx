import { useContext } from 'react';
import { NavItem, NavLink } from 'react-bootstrap';
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
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">BoardGames</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<NavLink to="/" as={Link}>Home</NavLink>
						{isAuthenticated && (
							<>
								<NavLink to="/logout" as={Link}>Logout</NavLink>
								<NavLink> | {username}</NavLink>
							</>
						)}
						{!isAuthenticated && (
							<>
								<NavLink to="/login" as={Link}>Login</NavLink>
								<NavLink to="/register" as={Link}>Register</NavLink>
							</>
						)}

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;