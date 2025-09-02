import React, {useState} from 'react';
import {Alert, Button, Modal} from "react-bootstrap";
import dayjs from "dayjs";
import {Spinner} from "../components/index.js";
import {ApplicationService} from "../chorus/index.js";
import {useDispatch} from "react-redux";
import {updateInstallation} from "../store/applicationSlice.js";

const appService = new ApplicationService();

export const InstallationViewModal = ({show, installation, onHide}) => {

    const [showSpinner, setShowSpinner] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();

    const completeEnrollment = (installation) => {
        setShowSpinner(true);
        appService.updateInstallationState(installation.appId, installation.id, 'Enrolled').then((data) => {
            dispatch(updateInstallation(data));
            setShowSpinner(false);
            setShowAlert(true);
        })
    }

    return (
        <>
            <Spinner show={showSpinner} text="Updating status..." />
            <Modal size="lg" show={show} onHide={onHide} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Installation Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert show={showAlert} variant="success" dismissible onClose={()=>setShowAlert(false)}>Installation was successfully updated</Alert>
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
                    {installation &&
                        <Button disabled={installation.configuration.state === "Enrolled"} className="me-auto" variant="primary" onClick={()=>{completeEnrollment(installation)}}>Complete Enrollment</Button>
                    }
                    <Button className="ms-auto" variant="primary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
