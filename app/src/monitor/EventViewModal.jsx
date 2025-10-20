import React from 'react';
import {Button, Col, Modal, Row} from "react-bootstrap";
import dayjs from "dayjs";
import {useSelector} from "react-redux";


export const EventViewModal = ({show, event, onHide}) => {

  const devices = useSelector(state => state.devices.devices);
  const _getDevice = (deviceId) => {
    return devices.find((device) => device.id === deviceId);
  }

  if (!event) {
    return (<></>);
  }
  return (
    <>
      <Modal size="lg" show={show} onHide={onHide} backdrop="static">
        <Modal.Header>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body as={Row}>
          <Col>
            <p>Time:</p>
            <p>Control ID:</p>
            <p>System:</p>
            <p>Status:</p>
          </Col>
          <Col>
            <p>{dayjs(event.content.timeStamp).format('lll')}</p>
            <p>{event.content.controlId}</p>
            <p>{_getDevice(event.content.deviceId) === undefined ? (<em>{event.content.deviceId}</em>) : _getDevice(event.content.deviceId).serialNumber}</p>
            <p>{event.content.status}</p>
          </Col>
        </Modal.Body>
          <Modal.Footer>
              <Button variant="primary" onClick={onHide}>Close</Button>
          </Modal.Footer>
      </Modal>
    </>
  );

};
