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
        <Modal.Header closeButton>
          <Modal.Title>Control Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <p><strong>Description:</strong> {control.details.description}</p>
              <p><strong>Start on:</strong> {dayjs(control.interval.start).format('lll')}&nbsp;
                <strong>Ends on:</strong> {dayjs(control.interval.start).add(control.interval.duration, 's').format('lll')}
              </p>
              <p><strong>Priority:</strong> {control.primacy}</p>
              <p><strong>Status:</strong> {control.status.status}</p>
              <Table>
                <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Name</th>
                  <th scope="col">Value</th>
                  <th scope="col">Unit</th>
                </tr>
                </thead>
                <tbody>
                {control.details.parameters.map((parameter, index) => (
                  <tr key={index}>
                    <td>{parameter.type}</td>
                    <td>{parameter.name}</td>
                    <td>{parameter.value}</td>
                    <td>{parameter.unit}</td>
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
                  <Form.Group controlId="earnings" className="mb-3">
                    <Form.Label><strong>Earnings:</strong></Form.Label>
                    <Form.Control type="text"
                                  placeholder={control.status.status === 'EventCompleted' ? 'Final Earnings' : 'Running Earnings'}
                                  onChange={handleChange} value={values.earnings}/>
                  </Form.Group>
                  <Row>
                    <Stack direction="horizontal" gap={3}>
                      <Button className="mt-2" variant="primary" type="submit">
                        Submit Earnings
                      </Button>
                      {control.status.status === 'EventReceived' && control.status.status === 'Active' &&(
                        <Button className="ms-auto"variant="danger" onClick={_cancelControl}>
                          Cancel Control
                        </Button>
                      )}
                    </Stack>
                  </Row>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>
    </>
  );

};