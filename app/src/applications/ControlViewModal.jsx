import React, {useState} from 'react';
import {Button, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import dayjs from "dayjs";
import {Formik} from "formik";
import {ApplicationService} from "../chorus/index.js";
import {Spinner} from "../components/index.js";

const applicationService = new ApplicationService();

export const ControlViewModal = ({show, control, appplicationId, installationId, onHide}) => {

  const [showSpinner, setShowSpinner] = useState(false);
  const _onSubmitEarnings = (values) => {
    console.log("submitting: "+values.earnings);
    setShowSpinner(true);
    const earnings = {
      text: values.earnings,
      type: control.status.status === 'EventCompleted' ? 'FinalEarning' : 'RunningEarning',
    }
    applicationService.submitEarnings(appplicationId, installationId, control.id, earnings).then((data) => {
      console.log(data);
      setShowSpinner(false);
    });
  }

  const _cancelControl = () => {

  }


  if (!control) {
    return (<></>);
  }
  return (
    <>
      <Spinner show={showSpinner} text="Submitting earnings"/>
      <Modal size="lg" show={show} onHide={onHide} backdrop="static">
        <Modal.Header>
          <Modal.Title>Control Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="mb-1"><strong>Description:</strong> {control.details.description}</p>
            <p className="mb-1 fw-light vandelay-smaller-text"><strong>id:</strong> {control.id}</p>
            <p className="mb-1"><strong>Created on:</strong> {dayjs(control.creationTime).format('LLL')}</p>
            <p className="mb-1"><strong>Starts on:</strong> {dayjs(control.interval.start).format('lll')}&nbsp;
                <strong>Duration:</strong> {control.interval.duration} secs.
            </p>

            <p className="mb-1"><strong>Primacy:</strong> {control.primacy}</p>
            <p className="mb-1"><strong>Status:</strong> {control.status.status}</p>
            <Table>
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Value</th>
                </tr>
                </thead>
                <tbody>
                {control.details.parameters.map((parameter, index) => (
                    <tr key={index}>
                        <td>{parameter.name}</td>
                        <td>{parameter.type}</td>
                        <td>{parameter.value} {parameter.unit}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
          {(control.status.status === 'EventCompleted' || control.status.status === 'Active') && (
            <Formik initialValues={{
              earnings: ''
            }} onSubmit={_onSubmitEarnings}>
              {({values, handleChange, handleSubmit}) => (
                <Form onSubmit={handleSubmit} className="mb-3" noValidate>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Group controlId="earnings" className="mb-3">
                            <Form.Label><strong>Earnings:</strong></Form.Label>
                            <Form.Control type="text"
                                          placeholder={control.status.status === 'EventCompleted' ? 'Final Earnings' : 'Running Earnings'}
                                          onChange={handleChange} value={values.earnings}/>
                        </Form.Group>
                        <Button className="mt-2" variant="primary" type="submit">
                            Send
                        </Button>
                    </Stack>
                  <Row>
                  </Row>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
          <Modal.Footer>
              {(control.status.status === 'EventReceived' || control.status.status === 'Active') &&(
                  <Button className="me-auto" variant="danger" onClick={_cancelControl}>
                      Cancel Control
                  </Button>
              )}
              <Button variant="outline-primary" onClick={onHide}>Close</Button>
          </Modal.Footer>
      </Modal>
    </>
  );

};
