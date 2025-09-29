
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="success"  className="mainNav p-3">
      <Container fluid>
        <Navbar.Brand className="brand mx-5">Registration Form</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto mx-5" >
            <Nav.Link className="brand mx-3" as={Link} to="/">Login</Nav.Link>
            <Nav.Link className="brand mx-3" as={Link} to="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
