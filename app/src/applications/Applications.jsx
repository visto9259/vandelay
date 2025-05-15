import {Col, Nav, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Application} from "../chorus/index.js";
import {Link} from "react-router";
import {BarChart, BarChartSteps, Eyeglasses, Gear, GraphUpArrow, House} from "react-bootstrap-icons";
import React from "react";

function Applications() {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);
  const loaded = useSelector((state) => state.applications.loaded);

  if (!loaded) {
    return (<></>)
  }
  return (
      <>
        <Row>
          <Col>
            <h2>Programs</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Category</th>
              </tr>
              </thead>
              <tbody>
              {applications.length>0 && applications.map((application) => (
                <tr key={application.id}>
                  <td><Link to={'/applications/'+application.id}>{application.versions[0].appName}</Link></td>
                  <td>{application.appType}</td>
                  <td>{application.category}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
  )
}
export default Applications;