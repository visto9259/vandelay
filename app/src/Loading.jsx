import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Col, Row} from "react-bootstrap";
import {Spinner} from "./components/index.js";

function Loading() {
  return (
    <>
      <div className="app-content">
        <main className="container">
          <Row>
            <Col>
              <Spinner show text={'Loading data...'}/>
            </Col>
          </Row>
        </main>
      </div>
      <Footer/>
    </>
  );
}
export default Loading;