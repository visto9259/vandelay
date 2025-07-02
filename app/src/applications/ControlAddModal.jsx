import React, {useState} from 'react';
import {Alert, Button, Col, Form, Modal, Row, Stack, Toast} from "react-bootstrap";
import {Formik} from "formik";
import dayjs from "dayjs";
import * as yup from "yup";
import {ApplicationService} from "../chorus/index.js";
import {v4 as uuidv4} from "uuid";
import {Spinner} from "../components/index.js";

const applicationService = new ApplicationService();

export const ControlAddModal = ({show, onHide, applicationId, installationId}) => {

  const [showSpinner, setShowSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const validationSchema = yup.object().shape({
    description: yup.string().required(),
    controlType: yup.string()
      .required(),
    startDateTime: yup.string().required(),
    endDateTime: yup.string().required(),
    powerValue: yup.number().required()
      .min(0, 'The power value must be greater than or equal to 0.')
      .max(8, 'The power value must be less of equal to 8kW.'),
    priority: yup.string().required(),
  });

  const _onSubmit = (values) => {
    console.log("submitting:");
    setShowSpinner(true);
    const control = {
      callbackUri: 'https://smee.io/uoa5cNtLuCWp6Sx',
      description: 'Vandelay Energy Control',
      id: uuidv4(),
      interval: {
        start: dayjs(values.startDateTime).toISOString(),
        duration: dayjs(values.endDateTime).diff(dayjs(values.startDateTime), 's'),
      },
      parameters: [{
        name: values.description,
        type: values.controlType,
        unit: 'W',
        value: values.powerValue * 1000,
      }],
      primacy: values.priority,
    }
    applicationService.submitControl(applicationId, installationId, control).then((data) => {
      setShowSpinner(false);
      setShowAlert(true);
      console.log(data);
    })
  }

  return (
    <>
      <Spinner show={showSpinner} text={'Submitting request...'}/>
      <Modal size="lg" show={show} onHide={onHide} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Schedule a new DER control</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success" className="ms-auto" dismissible show={showAlert} onClose={() => {setShowAlert(false)}}>
            The control was successfully submitted
          </Alert>
          <Formik initialValues={{
            description: '',
            controlType: 'export',
            startDateTime: dayjs().startOf('h').add(1,'h').format( 'YYYY-MM-DDTHH:mm:ss'),
            endDateTime: dayjs().startOf('h').add(2, 'hour').format( 'YYYY-MM-DDTHH:mm:ss'),
            powerValue: 0,
            priority: 'Provisional',
          }} onSubmit={_onSubmit} validationSchema={validationSchema}>
            {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control value={values.description} onChange={handleChange} onBlur={handleBlur} required type="text"
                                placeholder="Enter a description of the control"
                                isValid={touched.description && !errors.description} isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="controlType" className="mb-3">
                  <Form.Label>Control Type</Form.Label>
                  <Form.Select value={values.controlType} onChange={handleChange} className="mb-1"
                               required isValid={touched.controlType && !errors.controlType} isInvalid={!!errors.controlType}>
                    <option value="export">Grid export limit</option>
                    <option value="consumption">Grid import limit</option>
                    <option value="EVDCDischarge">EV DC Discharge Setpoint</option>
                    {/*}
                    <option value="ESSCharge">ESS Charge limit</option>
                    <option value="ESSDischarge">ESS Discharge limit</option>
                    <option value="EVDCCharge">EV DC Charge limit</option>
                    <option value="EVACCharge">EV AC Charge limit</option>
                    {*/}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.controlType}</Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="startDateTime">
                    <Form.Label>Start:</Form.Label>
                    <Form.Control onChange={handleChange} value={values.startDateTime} required type="datetime-local"/>
                  </Form.Group>
                  <Form.Group as={Col} controlId="endDateTime">
                    <Form.Label>End:</Form.Label>
                    <Form.Control onChange={handleChange} value={values.endDateTime} required type="datetime-local"/>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="powerValue">
                    <Form.Label>Power Value (kW)</Form.Label>
                    <Form.Control min={0} max={8} value={values.powerValue} onChange={handleChange} required type="number"
                                  placeholder="Power value"
                                  isValid={touched.powerValue && !errors.powerValue} isInvalid={!!errors.powerValue}
                    />
                    <Form.Control.Feedback type="invalid">{errors.powerValue}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select value={values.priority} onChange={handleChange} className="mb-3" required>
                      <option value={'Mandatory'}>Mandatory</option>
                      <option value={'Provisional'}>Provisional</option>
                      <option value={'Voluntary'}>Voluntary</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className ="">
                  <Stack direction="horizontal" gap={3}>
                    <Button variant="primary" type="submit">Submit</Button>
                  </Stack>
                </Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );

};
