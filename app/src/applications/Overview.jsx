import React from 'react';
import {Col, Row, Table} from "react-bootstrap";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {Link} from "react-router";

export const Overview = ({application}) => {

  const devices = useSelector(state => state.devices.devices);
  const _getDevice = (deviceId) => {
    return devices.find((device) => device.id === deviceId);
  }

  const Installations = ({application}) => {
    return (
      <>
        <Table>
          <thead >
          <tr className="d-none d-sm-table-row">
            <th scope="col">Systems</th>
            <th scope="col">Installed/Uninstalled</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {application.installations.map((installation) => (
              <tr key={installation.id} className="d-none d-sm-table-row">
                <td><Link to={'/devices/'+installation.deviceId}>{_getDevice(installation.deviceId) ? _getDevice(installation.deviceId).serialNumber : installation.deviceId}</Link></td>
                <td>{installation.configuration.state === 'Uninstalled' ?
                  dayjs(installation.uninstallDate).format('ll') :
                  dayjs(installation.installDate).format('ll')}
                </td>
                <td>{installation.configuration.state}</td>
              </tr>
          ))}
          </tbody>
        </Table>
      </>
    )
  }

  return (
    <>
    {/*}
      <Row>
        <Col>
          <h3>{application.versions[0].appName}</h3>
          <p className="my-1">Version: {application.versions[0].version}. Released: {dayjs(application.versions[0].release).format('LL')}</p>
        </Col>
      </Row>
     {*/}
      <Row>
        <Col>
          <h4>Installations:</h4>
          <Installations application={application}/>
        </Col>
      </Row>
    </>
  );
};

{/*}
      <Row>
        <Col>
          <h3>Installations:</h3>
          <Table>
            <thead >
              <tr className="d-none d-sm-table-row">
                <th scope="col">Device</th>
                <th scope="col">Install Date</th>
                <th scope="col">Version</th>
              </tr>
            </thead>
            <tbody>
            {application.installations.map((installation) => {
                return (<Installation key={installation.id} installation={installation}/>)
            })}
            </tbody>
          </Table>
        </Col>
      </Row>
      {*/}
