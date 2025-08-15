import React from 'react';
import {Button, Modal, Table} from "react-bootstrap";
import dayjs from "dayjs";

export const ApplicationsViewModal = ({show, application, onHide}) => {
    return (
        <>
            <Modal show={show} onHide={onHide} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {application && (
                        <div>
                            <p className="fw-light" style={{fontSize: "0.7rem"}}><strong>id: </strong>{application.id}</p>
                            <p><strong>Type: </strong>{application.appType}</p>
                            <p><strong>Category: </strong>{application.category}</p>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Version</th>
                                    <th>Released</th>
                                    <th>Latest</th>
                                </tr>
                                </thead>
                                <tbody>
                                {application.versions.map(version => (
                                    <>
                                        <tr>
                                            <td>
                                                <div className="m-0">
                                                    <p className="m-0">{version.version}</p>
                                                    <p className="m-0 fw-light" style={{fontSize: "0.7rem"}}>id: {version.id}</p>
                                                </div>
                                            </td>
                                            <td>{dayjs(version.release).format('D MMM YYYY')}</td>
                                            <td>{version.latest ? 'Yes' : ''}</td>
                                        </tr>
                                    </>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
