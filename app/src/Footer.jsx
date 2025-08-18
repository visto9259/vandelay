import {Container} from "react-bootstrap";

function Footer() {
  const now = new Date;
  return (
    <>
      <footer className="app-footer">
        <Container>
          <hr/>
          <p>
            &copy;{now.getFullYear()} Capacity, by dcbel.
          </p>
        </Container>
      </footer>
    </>
  )
}

export default Footer;
