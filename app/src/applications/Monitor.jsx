import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Row, Table} from "react-bootstrap";
import EventsService from "../chorus/EventsService.js";
import dayjs from "dayjs";
import {useSelector} from "react-redux";

const eventsService = new EventsService();

export const Monitor = (props) => {
  const timerIdRef = useRef(null);
  const [events, setEvents] = useState([]);
  const devices = useSelector(state => state.devices.devices);

  const _getDevice = (deviceId) => {
    return devices.find((device) => device.id === deviceId);
  }

  const _onClearClick = () => {
    eventsService.clearEvents().then(() => {
      setEvents([]);
    })
  }

  useEffect(() => {
    const pollingCB = () => {
      eventsService.getEvents().then((data) => {
        setEvents(data);
      })
    }
    const startPolling = () => {
      timerIdRef.current = setInterval(pollingCB, 30000);
    }
    const stopPolling = () => {
      clearInterval(timerIdRef.current);
    }
    pollingCB();
    startPolling();

    return () => {
      stopPolling();
    }
  },[])

  return (
    <>
    <Row>
      <Col className="mb-2">
        <h3>Monitor</h3>
        <Button variant="primary" onClick={_onClearClick}>Clear</Button>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Control</th>
            <th scope="col">Device</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{dayjs(event.content.timeStamp).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{event.content.controlId}</td>
              <td>{_getDevice(event.content.deviceId).serialNumber}</td>
              <td>{event.content.status}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Col>
    </Row>
      </>
  );

};