import React from 'react';
import {Col, Modal, Row} from "react-bootstrap";
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
        <Modal.Header closeButton>
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
            <p>{dayjs(event.content.timestamp).format('lll')}</p>
            <p>{event.content.controlId}</p>
            <p>{_getDevice(event.content.deviceId).serialNumber}</p>
            <p>{event.content.status}</p>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );

};