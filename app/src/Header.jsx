import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router";
import {AboutModal} from "./about/AboutModal.jsx";
import {useState} from "react";

function Header({nonav = false}) {
  const [showAboutModal, setShowAboutModal] = useState(false);
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
                <Nav className="me-auto">
                  <NavLink to="/applications" className={'nav-link'}>DER Program</NavLink>
                  <NavLink to="/devices" className={'nav-link'}>Systems</NavLink>
                  <NavLink to="/monitor" className={'nav-link'}>Monitor</NavLink>
                </Nav>
                <Nav>
                  <NavLink to="#" className="nav-link" onClick={()=>setShowAboutModal(true)}>About</NavLink>
                </Nav>
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>
      </header>
      <AboutModal show={showAboutModal} onHide={()=>setShowAboutModal(false)}/>
    </>
  )
}

export default Header;
