import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router";

function Header({nonav = false}) {
  return (
    <>
      <header className="app-header">
        <Navbar bg="light" data-bs-scheme="light" expand={"sm"} className="fixed-top">
          <Container>
            <Navbar.Brand href="/">
              <img alt="" src="/dist/vandelay.svg" width="30" height="30" className="d-inline-block align-top"/>
              {' '}Vandelay
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            {!nonav && (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavLink to="/devices" className={'nav-link'}>Systems</NavLink>
                  <NavLink to="/applications" className={'nav-link'}>Programs</NavLink>
                  <NavLink to="/monitor" className={'nav-link'}>Monitor</NavLink>
                </Nav>
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header;
