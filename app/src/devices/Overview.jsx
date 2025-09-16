import React from 'react';
import {Col, Row, Table} from "react-bootstrap";
import dayjs from "dayjs";

export const Overview = ({device}) => {

    const {configuration} = device;
    const {dcbel} = configuration;


  return (
    <>
        <Row>
            <Col>
                <h4>Overview</h4>
                <p className="m-1" style={{fontSize: "0.75rem"}}>id: {device.id}</p>
            </Col>
        </Row>
        <Row>
            <Col className="m-1 border border-1 border-secondary" lg={4}>
                <h5>System Details:</h5>
                <p className="mb-1">{device.model} {device.color}</p>
                <p className="mb-1">{device.address.freeformAddress}</p>
                <p className="mb-1">Boot date: {dayjs(device.bootDate).tz(dcbel.timeZone).format('LLL')}</p>
            </Col>
            <Col className="m-1 border border-1 border-secondary" lg={6}>
                <h5>Configuration:</h5>
                <Table size="sm" borderless>
                    <tbody>
                        {device.configuration.dcbel && (
                            <tr>
                                <td>Time Zone:</td>
                                <td>{device.configuration.dcbel.timeZone}</td>
                            </tr>
                        )}
                        {device.configuration.ess && (
                            <>
                                <tr>
                                    <td>ESS:</td>
                                    <td>{device.configuration.ess.brand} {device.configuration.ess.model} {device.configuration.ess.ratedKwh} kWh</td>
                                </tr>
                                <tr>
                                    <td>ESS Serial Number:</td>
                                    <td>{device.configuration.ess.serialNumber}</td>
                                </tr>
                            </>
                        )}
                        {device.configuration.ev && device.configuration.ev.map((ev, i) => (
                            <>
                                <tr key={i}>
                                    <td>EV{i+1}:</td>
                                    <td>{ev.make} {ev.model} {ev.year}</td>
                                </tr>
                            </>
                        ))}
                        {device.configuration.tariff && (
                            <>
                                <tr>
                                    <td>Utility:</td>
                                    <td>{device.configuration.tariff.utility}</td>
                                </tr>
                                <tr>
                                    <td>Tariff:</td>
                                    <td>{device.configuration.tariff.tariffName}</td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </>
  );

};
