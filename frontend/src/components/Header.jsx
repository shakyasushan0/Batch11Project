import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/react.svg";
import { NavLink } from "react-router";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} alt="logo" />
            Broadway
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-bar" />
          <Navbar.Collapse id="nav-bar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signin">
                <FaUser /> Signin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
