import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row, Stack, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {ApplicationService} from "../chorus/index.js";
import dayjs from "dayjs";
import {ControlViewModal} from "./ControlViewModal.jsx";
import {ControlAddModal} from "./ControlAddModal.jsx";
import {Spinner} from "../components/index.js";
import {ArrowClockwise} from "react-bootstrap-icons";

const applicationService = new ApplicationService();

export const Schedule = ({application}) => {
  const devices = useSelector(state => state.devices.devices);
  const [installationId, setInstallationId] = useState(application.installations.length > 0 ? application.installations[0].id : null);
  const _getDevice = (deviceId) => {
    return devices.find((device) => device.id === deviceId);
  }
  const [showSpinner, setShowSpinner] = useState(false);
  const [controls, setControls] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [control, setControl] = useState(null);
  const [refresh, setRefesh] = useState(false);

  useEffect(() => {
    if (installationId !== null || refresh) {
      if (refresh) {setRefesh(false);}
      setShowSpinner(true);
      const params = new URLSearchParams();
      const now = new Date();
      const fromDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
      const toDate = new Date(now.getTime() + 5*24*3600*1000);
      params.append('fromDate', fromDate.toISOString());
      params.append('toDate', toDate.toISOString());
      applicationService.getControls(application.id, installationId, params).then((controls) => {
        setControls(controls);
        setShowSpinner(false);
      });
    }
  },[installationId, refresh])

  /*
  useEffect(() => {
    setInstallationId(application.installations.length > 0 ? application.installations[0].id : null);
  }, []);

   */


  const _onSelect = ({target}) => {
    if (target.value !== 'none') {
      setInstallationId(target.value);
    } else {
      setControls([]);
    }
  }

  const _onViewButtonClick = (control) => {
    setControl(control);
    setShowViewModal(true);
  }

  const FutureControls = () => {
    const activeControls = controls.filter((control) => {
      const now = dayjs();
      const startDate = dayjs(control.interval.start);
      const endDate = dayjs(startDate).add(control.interval.duration, 's');
      return now.isBefore(startDate) || now.isBetween(startDate,endDate);
    })
    return (
      <>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">Dur. (secs)</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {activeControls.length > 0 && activeControls.map((control) => (
            <tr key={control.id}>
              <td>{control.id}</td>
              <td>{control.details.description}</td>
              <td>{dayjs(control.interval.start).format('lll')}</td>
              <td>{control.interval.duration}</td>
              <td>{control.status.status}</td>
              <td><Button color="primary" size="sm" onClick={()=> _onViewButtonClick(control)}>View</Button></td>
            </tr>
          ))}
          </tbody>
        </Table>
      </>
    );
  }
  const PastControls = () => {
    const pastControls = controls.filter((control) => {
     const now = dayjs();
     const startDate = dayjs(control.interval.start);
     const endDate = dayjs(startDate).add(control.interval.duration, 's');
     return now.isAfter(endDate);
    })
    return (
      <>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">Dur. (secs)</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {pastControls.length > 0 && pastControls.map((control) => (
            <tr key={control.id}>
              <td>{control.id}</td>
              <td>{control.details.description}</td>
              <td>{dayjs(control.interval.start).format('lll')}</td>
              <td>{control.interval.duration}</td>
              <td>{control.status.status}</td>
              <td><Button color="primary" size="sm" onClick={()=> _onViewButtonClick(control)}>View</Button></td>
            </tr>
          ))}
          </tbody>
        </Table>
      </>
    );
  }

  return (
    <>
      <Spinner show={showSpinner}/>
      {/*}
      <Row className="mb-2">
        <Col>
          <h4>Schedules</h4>
        </Col>
      </Row>
      {*/}
      {application.installations.length === 0 && (
        <Row>
          <Col>
            <p>No installations found for this application.</p>
          </Col>
        </Row>
      )}
      {application.installations.length > 0 && (
      <>
        <Row className="mb-2">
          <Col>
            <Form>
              <Form.Group as={Row} controlId="selectDevice">
                <Col sm={10}>
                  <Form.Select onChange={_onSelect} value={installationId}>
                    {application.installations.map((installation) => (
                      <option key={installation.id} value={installation.id}>{_getDevice(installation.deviceId).serialNumber}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
          <Stack direction="horizontal" gap={3}>
            <Button className="mx-1" variant="primary" onClick={() => {setShowAddModal(true)}}>New Schedule</Button>
            <Button className="ms-auto" variant="primary" onClick={() => {setRefesh(true)}}><ArrowClockwise/></Button>
          </Stack>
        <hr/>
        <Row>
          <Col>
            <h6>Upcoming and Active Controls</h6>
            <FutureControls/>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <h6>Past Controls (up to last 5 days)</h6>
            <PastControls/>
          </Col>
        </Row>
        <ControlViewModal show={showViewModal} appplicationId={application.id} installationId={installationId}
                          control={control} onHide={() => setShowViewModal(false)}/>
        <ControlAddModal show={showAddModal} applicationId={application.id} installationId={installationId} onHide={() => setShowAddModal(false)}/>
      </>
      )}
    </>
  );

};