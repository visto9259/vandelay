import React, {useEffect} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {DigitalTwinService} from "../chorus/index.js";
import {Spinner} from "../components/index.js";
import {Formik} from "formik";

const digitalTwinService = new DigitalTwinService();
export const Configure = ({device}) => {
    const [loading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({});

    useEffect(() => {
        setLoading(true);
        digitalTwinService.getDigitalTwinState(device.id).then((data) => {
            setLoading(false);
            setState(data);
        })
    }, []);

    const _onSubmit = (values) => {
        setLoading(true);
        digitalTwinService.updateDigitalTwinState(device.id, {
            "essState": {
                "soC": values.essSoC,
            },
            "evAcTransaction": {
                "isActive": values.evACIsActive,
                "soC": values.evACSoC,
            },
            "evDcTransaction": {
                "isActive": values.evDCIsActive,
                "soC": values.evDCSoC,
            },
            "isOffGrid": values.isOffGrid,
        }).then((data) => {
            console.log(data);
            setState(data);
            setLoading(false);
        });

    }


    return (
        <>
            {loading && <Spinner show text={'Loading configuration...'}/>}
            {!loading && <>
                <Row>
                    <Col>
                        <h5>Digital Twin Configuration</h5>
                        <hr/>
                        <Formik initialValues={
                            {
                                essChargingState: state.essState.chargingState,
                                essSoC: state.essState.soC,
//                                evACSoC: state.evAcTransaction.soC,
                                evACSoC: state.evAcTransaction.isActive ? state.evAcTransaction.soC : 0,
                                evDCSoC: state.evDcTransaction.isActive ? state.evDcTransaction.soC : 0,
                                evACIsActive: state.evAcTransaction.isActive,
                                evDCIsActive: state.evDcTransaction.isActive,
                                isOffGrid: state.isOffGrid,
                            }
                        } onSubmit={_onSubmit}>
                            {({values, handleChange, handleBlur, handleSubmit
                            }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row className="d-flex justify-content-start">
                                        <Col xs={3}>
                                            <p>ESS</p>
                                        </Col>
                                        <Form.Group as={Col} xs={4} controlId="essSoC">
                                            <Form.Range value={values.essSoC} onChange={handleChange} onBlur={handleBlur} min={0} max={100} step={10}/>
                                            <p><small>State of Charge: {values.essSoC}</small></p>
                                        </Form.Group>
                                    </Row>
                                    <Row className="d-flex justify-content-start">
                                        <Col xs={3}>
                                            <p className="mb-1">EV AC</p>
                                            <Form.Switch checked={values.evACIsActive}
                                                id="evACIsActive" value={values.evACIsActive} onChange={handleChange} onBlur={handleBlur}
                                                label={values.evACIsActive ? 'Connected' : 'Disconnected'}
                                            />
                                        </Col>
                                        <Form.Group as={Col} xs={4} controlId="evACSoC">
                                            <Form.Range disabled={!values.evACIsActive}
                                                        value={values.evACSoC} onChange={handleChange} onBlur={handleBlur} min={0} max={100} step={10}/>
                                            <p><small>State of Charge: {values.evACSoC}</small></p>
                                        </Form.Group>
                                    </Row>
                                    <Row className="d-flex justify-content-start">
                                        <Col xs={3}>
                                            <p className="mb-1">EV DC</p>
                                            <Form.Switch checked={values.evDCIsActive}
                                                id="evDCIsActive" value={values.evDCIsActive} onChange={handleChange} onBlur={handleBlur}
                                                label={values.evDCIsActive ? 'Connected' : 'Disconnected'}
                                            />
                                        </Col>
                                        <Form.Group as={Col} xs={4} controlId="evDCSoC">
                                            <Form.Range disabled={!values.evDCIsActive}
                                                        value={values.evDCSoC} onChange={handleChange} onBlur={handleBlur} min={0} max={100} step={10}/>
                                            <p><small>State of Charge: {values.evDCSoC}</small></p>
                                        </Form.Group>
                                    </Row>
                                    <Row className="d-flex justify-content-start">
                                        <Col xs={3}>
                                            <p className="mb-1">Off Grid</p>
                                            <Form.Switch checked={values.isOffGrid} id="isOffGrid" value={values.isOffGrid} onChange={handleChange} onBlur={handleBlur}

                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col>
                                            <Button variant="primary" type="submit">Send</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </>
            }
        </>
    );
}
