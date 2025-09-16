import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Modal, Row, Stack, Table} from "react-bootstrap";
import EventsService from "../chorus/EventsService.js";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {EventViewModal} from "./EventViewModal.jsx";
import {ArrowClockwise} from "react-bootstrap-icons";
import {Spinner} from "../components/index.js";


const eventsService = new EventsService();

export const Monitor = () => {
    const timerIdRef = useRef(null);
    const [events, setEvents] = useState([]);
    const devices = useSelector(state => state.devices.devices);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [eventInModal, setEventInModal] = useState(null);
    const [loading, setLoading] = useState(false);

    const _getDevice = (deviceId) => {
        return devices.find((device) => device.id === deviceId);
    }

    const _onClearClick = () => {
        setLoading(true);
        eventsService.clearEvents().then(() => {
            setEvents([]);
            setLoading(false);
        })
    }

    const pollingCB = () => {
      setLoading(true);
        eventsService.getEvents().then((data) => {
            // Sort
            data.sort((a,b) => {
                const aTime = new Date(a.content.timeStamp);
                const bTime = new Date(b.content.timeStamp);
                return (aTime<bTime) ? 1 : -1;
            });
            setEvents(data);
            setLoading(false);
        })
    }
    const startPolling = () => {
        timerIdRef.current = setInterval(pollingCB, 30000);
    }
    const stopPolling = () => {
        clearInterval(timerIdRef.current);
    }

    useEffect(() => {
        pollingCB();
        startPolling();

        return () => {
            stopPolling();
        }
    },[])

    const _onRefreshClick = () => {
        stopPolling();
        pollingCB();
        startPolling();
    }

    const ClearConfirmModal = ({show, onHide, onConfirm}) => (
        <>
            <Modal size="sm" show={show} onHide={onHide} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Clear logs?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to clear the logs?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        onConfirm();
                        onHide();
                    }}>Yes</Button>
                    <Button variant="success" onClick={onHide}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )


    return (
        <>
            <Spinner show={loading} size="lg"/>
            <Row>
                <Col className="mb-2">
                    <h3>Monitor</h3>
                    <Stack direction="horizontal">
                        <Button variant="danger" onClick={() => setShowClearModal(true)}>Clear</Button>
                        <Button className="ms-auto" variant="outline-primary" onClick={_onRefreshClick}><ArrowClockwise/></Button>
                    </Stack>
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
                                <td>{_getDevice(event.content.deviceId) === undefined ? (<em>{event.content.deviceId}</em>) : _getDevice(event.content.deviceId).serialNumber}</td>
                                <td>{event.content.status}</td>
                                <td><Button size="sm" onClick={()=>{
                                    setShowEventModal(true);
                                    setEventInModal(event);
                                }} variant="outline-primary">View</Button> </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <EventViewModal show={showEventModal} event={eventInModal} onHide={()=>setShowEventModal(false)}/>
            <ClearConfirmModal show={showClearModal} onHide={()=>setShowClearModal(false)} onConfirm={_onClearClick}/>
        </>
    );

};
