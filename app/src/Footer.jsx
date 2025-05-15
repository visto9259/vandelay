import {Container} from "react-bootstrap";

function Footer() {
  const now = new Date;
  return (
    <>
      <footer className="app-footer">
        <Container>
          <hr/>
          <p>
            &copy;{now.getFullYear()} <a href="https://capacity.energy/">Capacity</a>, by dcbel.
          </p>
        </Container>
      </footer>
    </>
  )
}

export default Footer;