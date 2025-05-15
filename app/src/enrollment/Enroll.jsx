import React,{useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {Spinner} from "../components/index.js";
import {useNavigate, useSearchParams} from "react-router";
import {useSelector} from "react-redux";
import {ApplicationService} from "../chorus/index.js";

const applicationService = new ApplicationService();

export const Enroll = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const installationId = searchParams.get('installationid') || searchParams.get('installationId');
  const applications = useSelector(state => state.applications.applications);
  const _installationIdValid = (installationId) => {
    return installationId.match(/[0-9a-z-A-Z]{8}-[0-9a-z-A-Z]{4}-[0-9a-z-A-Z]{4}-[0-9a-z-A-Z]{4}-[0-9a-z-A-Z]{12}/g);
  }

  const _findInstallation = (installationId) => {
    let foundItem = null;
    applications.forEach((application) => {
      foundItem = application.installations.find((item) => item.id === installationId);
    })
    return foundItem === undefined ? null : foundItem;
  }

  const installation = _findInstallation(installationId);

  const _onSubmit = (values) => {
    setShow(true);
    applicationService.updateInstallationState(installation.appId, installationId, 'Enrolled').then(() => {
      console.log('success');
      setShow(false);
      navigate(`/enroll/complete/${installationId}?name=${name}`);
    })
    console.log(values);
  }


  if (!installationId || !_installationIdValid(installationId)) {
    return (
      <Row>
        <Col>
          <p>Missing installation identifier</p>
        </Col>
      </Row>
    );
  }
  if (!installation) {
    return (
      <Row>
        <Col>
          <p>Cannot find this installation.</p>
        </Col>
      </Row>
    )
  }
  if (installation.status === 'Uninstalled') {
    return (
      <Row>
        <Col>
          <p>The application is uninstalled from your system.</p>
        </Col>
      </Row>
    )
  }
  if (installation.status === 'Installed' && installation.configuration.state === 'Enrolled') {
    return (
      <Row>
        <Col>
          <p>Your system is already enrolled.</p>
        </Col>
      </Row>
    )
  }
  /*
  if (installation.status === 'Installed' && installation.configuration.state === 'Suspended') {
    return (
      <Row>
        <Col>
          <p>Your enrollment has been suspended.</p>
        </Col>
      </Row>
    )
  }

   */
  return (
    <>
      <Spinner show={show} text={'Submitting request...'}/>
      <Row>
        <Col>
          <h2>Welcome to Vandelay Energy</h2>

          <p>To enroll into the DER Flexibility Program, please enter your name.</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Formik initialValues={
            {
              name: '',
              terms: false
            }
          } onSubmit={_onSubmit}
          >
            {({values, handleChange, handleBlur, handleSubmit
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control required type="text" placeholder="Enter name" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                </Form.Group>
                <Form.Check required className="my-2" type="checkbox" id="terms"
                            label="I accept the terms and conditions"
                            value={values.terms} onChange={handleChange} onBlur={handleBlur}
                />
                <Button className="my-2" variant="primary" type="submit">Enroll</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );

};