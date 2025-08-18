import React from 'react';
import {Button, Modal} from "react-bootstrap";

export const AboutModal = ({show, onHide}) => {
    const now = new Date();
    return (
        <>
            <Modal show={show} onHide={onHide} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Vandelay Energy Demo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The Vandelay Energy is mock Commercial Aggregator that demonstrates the capabilities of Chorus Transact.</p>
                    <p>Version x.x.x</p>
                    <p>&copy;{now.getFullYear()} dcbel inc.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
