import {Container} from "react-bootstrap";

function Footer() {
  const now = new Date;
  return (
    <>
      <footer className="app-footer">
        <Container>
          <hr/>
          <p className="vandelay-smaller-text">
            &copy;{now.getFullYear()} dcbel inc. v.{__VANDELAY_APP_VERSION__}
          </p>
        </Container>
      </footer>
    </>
  )
}

export default Footer;
