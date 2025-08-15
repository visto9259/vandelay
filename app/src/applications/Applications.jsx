import {Button, Col, Nav, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Application} from "../chorus/index.js";
import {Link} from "react-router";
import {BarChart, BarChartSteps, Eyeglasses, Gear, GraphUpArrow, House, QuestionCircle} from "react-bootstrap-icons";
import React, {useState} from "react";
import {ApplicationsViewModal} from "./ApplicationsViewModal.jsx";

function Applications() {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);
  const loaded = useSelector((state) => state.applications.loaded);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsModalApplication, setDetailsModalApplication] = useState(null);

  if (!loaded) {
    return (<></>)
  }
  return (
      <>
        <Row>
          <Col>
            <h2>Program</h2>
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
                <th scope="col">Version</th>
              </tr>
              </thead>
              <tbody>
              {applications.length>0 && applications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <Link to={'/applications/'+application.id}>{application.versions[0].appName}</Link>
                    <Button size="sm" variant="primary-outline" onClick={() => {
                      setShowDetailsModal(true);
                      setDetailsModalApplication(application);
                    }}><QuestionCircle/></Button>
                  </td>
                  <td>{application.appType}</td>
                  <td>{application.category}</td>
                  <td>{application.versions[0].version}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <ApplicationsViewModal show={showDetailsModal} application={detailsModalApplication} onHide={()=> setShowDetailsModal(false)}/>
      </>
  )
}
export default Applications;
