import {Col, Row} from "react-bootstrap";
import React from "react";

const Home = () => {

  return (
    <>
        <Row>
          <Col>
            <h2>Welcome to the Vandelay Flex Energy Demo</h2>
              <p>The Vandelay Energy is a mock Commercial Aggregator that demonstrates the capabilities of Chorus Transact.</p>
              <p>Version {__VANDELAY_APP_VERSION__}</p>
          </Col>
        </Row>
    </>
  );
}
export default Home;
