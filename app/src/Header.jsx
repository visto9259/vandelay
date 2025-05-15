import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router";

function Header({nonav = false}) {
  return (
    <>
      <header className="app-header">
        <Navbar expand={"sm"} className="navbar-light bg-light fixed-top">
          <Container>
            <Navbar.Brand href="/">Vandelay</Navbar.Brand>
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