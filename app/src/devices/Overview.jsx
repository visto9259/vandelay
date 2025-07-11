import React from 'react';
import {useSelector} from "react-redux";
import {Col, Row, Table} from "react-bootstrap";
import dayjs from "dayjs";

export const Overview = ({device}) => {

    const {configuration} = device;
    const {dcbel, ess} = configuration;


  return (
    <>
        <Row>
            <Col>
                <h4>Overview</h4>
            </Col>
        </Row>
        <Row>
            <Col className="m-1 border border-1 border-secondary" lg={6}>
                <h5>System Details:</h5>
                <p className="mb-1">{device.model} {device.color}</p>
                <p className="mb-1">{device.address.freeformAddress}</p>
                <p className="mb-1">Boot date: {dayjs(device.bootDate).tz(dcbel.timeZone).format('LLL')}</p>
            </Col>
        </Row>
        <Row>
            <Col className="m-1 border border-1 border-secondary" lg={6}>
                <h5>Configuration:</h5>
                <Table borderless>
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
