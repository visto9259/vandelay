import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Stack, Table} from "react-bootstrap";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router";
import {ArrowClockwise, QuestionCircle} from "react-bootstrap-icons";
import {InstallationViewModal} from "./InstallationViewModal.jsx";
import {Spinner} from "../components/index.js";
import {getApplications} from "../store/applicationSlice.js";

export const Overview = ({application}) => {

  const devices = useSelector(state => state.devices.devices);
  const _getDevice = (deviceId) => {
    return devices.find((device) => device.id === deviceId);
  }
  const [installationIndex, setInstallationIndex] = useState(null);
  const [showInstallationModal, setShowInstallationModal] = useState(false);
  const [installationModal, setInstallationModal] = useState(null);
  const applicationIsLoading = useSelector(state => state.applications.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
      if (installationIndex !== null) {
          setInstallationModal(application.installations[installationIndex]);
      }
  }, [application, installationIndex]);

  const _onRefreshClick = () => {
      dispatch(getApplications(application.id));
  }

  const Installations = ({installations}) => {
    return (
      <>
        <Table>
          <thead >
          <tr className="d-none d-sm-table-row">
            <th scope="col">Systems</th>
            <th scope="col">Installed/Uninstalled</th>
            <th scope="col">Status</th>
            <th scope="col">HES Access</th>
          </tr>
          </thead>
          <tbody>
          {installations.map((installation, index) => (
              <tr key={installation.id} className="d-none d-sm-table-row">
                <td><Link to={'/devices/'+installation.deviceId}>{_getDevice(installation.deviceId) ? _getDevice(installation.deviceId).serialNumber : installation.deviceId}</Link></td>
                <td>{installation.configuration.state === 'Uninstalled' ?
                  dayjs(installation.uninstallDate).format('ll') :
                  dayjs(installation.installDate).format('ll')}
                </td>
                <td>{installation.configuration.state}</td>
                <td>
                  {installation.configuration.hesState}
                  <Button size="sm" variant="none" onClick={() =>{
                    setShowInstallationModal(true);
                    setInstallationIndex(index);
                  }}
                  ><QuestionCircle/></Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>
      </>
    )
  }

  return (
    <>
        <Spinner show={applicationIsLoading} text="Refreshing"/>
      <Row>
        <Col>
            <Stack direction="horizontal">
                <h4>Installations:</h4>
                <Button size="sm" className="ms-auto" onClick={_onRefreshClick}><ArrowClockwise/></Button>
            </Stack>
            <Installations installations={application.installations}/>
            <InstallationViewModal
                show={showInstallationModal}
                installation={installationModal}
                onHide={()=>setShowInstallationModal(false)}
            />
        </Col>
      </Row>
    </>
  );
};
