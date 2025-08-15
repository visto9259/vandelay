import React from 'react';
import {Button, Modal} from "react-bootstrap";
import dayjs from "dayjs";

export const InstallationViewModal = ({show, installation, onHide}) => {
    return (
        <>
            <Modal size="lg" show={show} onHide={onHide} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Installation Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {installation && (
                        <>
                            <p className="fw-light" style={{fontSize: "0.7rem"}}>id: {installation.id}</p>
                            <p className="mb-1"><strong>Installed: </strong>{dayjs(installation.installDate).format('YYYY-MM-DD')}</p>
                            <p className="mb-1"><strong>Status: </strong>{installation.status}</p>
                            <p className="mb-1"><strong>Version: </strong>{installation.version}</p>
                            <p className="mb-1"><strong>HES Status: </strong>{installation.configuration.hesState}</p>
                            <p className="mb-1"><strong>State: </strong>{installation.configuration.state}</p>
                            <p className="mb-1"><strong>Enrollment Last Update: </strong>{dayjs(installation.configuration.enrollmentLastUpdate).format('LLL')}</p>
                            <p className="mb-1"><strong>HES Access Last Update: </strong>{dayjs(installation.configuration.hesAccessLastUpdate).format('LLL')}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
