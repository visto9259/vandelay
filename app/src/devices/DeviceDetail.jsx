import React, {useEffect} from 'react';
import {Badge, Col, Nav, NavItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Row} from "react-bootstrap";
import {useParams} from 'react-router';
import {useSelector} from "react-redux";
import {Device} from "../chorus/index.js";
import {Spinner} from "../components/index.js";
import  './style.css';
import {Telemetry} from "./Telemetry.jsx";
import {Forecast} from "./Forecast.jsx";
import {Trends} from "./Trends.jsx";
import {Energy} from "./Energy.jsx";
import {
  BarChart,
  BarChartSteps, Eye,
  Eyeglasses, GearWideConnected,
  GraphUp,
  GraphUpArrow,
  People,
  Puzzle,
  Speedometer
} from "react-bootstrap-icons";
import {Schedule} from "./Schedule.jsx";
import {AppOverview} from "./AppOverview.jsx";
import {Configure} from "./Configure.jsx";


export const DeviceDetail = () => {
  const {deviceId} = useParams();
  const [loading, setLoading] = React.useState(true);
  const device = useSelector(state => {
    const a= state.devices.devices.find((device) => device.id === deviceId);
    return a === undefined ? null : a;
  });
  const [activeTab, setActiveTab] = React.useState('status');

  useEffect(() => {
    if (device && loading) {
      setLoading(false);
    }
  }, [device, loading]);


  if (!device) {
    return <>
      <Row>
        <Col>
          <h2>Oups!</h2>
          <p>Cannot find this device</p>
        </Col>
      </Row>
    </>
  }

  if (loading) {
    return(
      <><Spinner show text={"Loading..."}/></>)
  }
  return (
    <>
      <Row>
        <Col>
          <h2>{device.serialNumber} <Badge pill bg="success">{device.status.status}</Badge>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={3} lg={2} className="sidebar border border-right p-0 bg-body-tertiary">
          <Offcanvas responsive="md" placement="end" className="bg-body-tertiary" tabIndex="-1" id="sidebarMenu"
               aria-labelledby="sidebarMenuLabel">
            <OffcanvasHeader>
              <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu"
                      aria-label="Close"></button>
            </OffcanvasHeader>
            <OffcanvasBody className="d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
              <Nav className="flex-column navbar-nav"
                   activeKey={activeTab}
                   onSelect={(selectedKey) => {
                     setActiveTab(selectedKey);
//                     console.log(selectedKey);
                   }}
              >
                <Nav.Item>
                  <Nav.Link eventKey="status" className="d-flex align-items-center gap-2 active">
                    <Speedometer/>
                    Telemetry
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="forecast" className="d-flex align-items-center gap-2">
                    <GraphUpArrow/>
                    Forecast
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="trends" className="d-flex align-items-center gap-2">
                    <GraphUp/>
                    Trends
                  </Nav.Link>
                </Nav.Item>
                {/*}
                <Nav.Item>
                  <Nav.Link eventKey="program-events" className="d-flex align-items-center gap-2">
                    <People/>
                    Program Events
                  </Nav.Link>
                </Nav.Item>
                {*/}
                <Nav.Item>
                  <Nav.Link eventKey="energy" className="d-flex align-items-center gap-2">
                    <BarChart/>
                    Energy
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Controls" className="d-flex align-items-center gap-2" href="#">
                    <Puzzle/>
                    DER Controls
                  </Nav.Link>
                </Nav.Item>
                <h6
                  className="d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                  <span>Programs</span>
                </h6>
                {/*}
                <Nav.Item>
                  <Nav.Link eventKey="overview" className="d-flex align-items-center gap-2" href="#">
                    <Eye/>
                    Overview
                  </Nav.Link>
                </Nav.Item>
                {*/}
                <Nav.Item>
                  <Nav.Link eventKey="schedule" className="nav-link d-flex align-items-center gap-2" href="#">
                    <BarChartSteps/>
                    Schedules
                  </Nav.Link>
                </Nav.Item>

              <hr className="my-3"/>

                <Nav.Item>
                  <Nav.Link eventKey="configure" className="d-flex align-items-center gap-2">
                    <GearWideConnected/>
                    Configure
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </OffcanvasBody>
          </Offcanvas>
        </Col>
        <Col>
          {(() => {
            switch (activeTab) {
              case "status":
                return <Telemetry device={device}/>;
              case "forecast":
                return <Forecast device={device}/>;
              case "trends":
                return <Trends device={device}/>;
              case "schedule":
                return <Schedule device={device}/>;
              case 'overview':
                return <AppOverview device={device}/>;
              case 'configure':
                return <Configure device={device}/>;
              case 'energy':
                return <Energy device={device}/>
            }
          })()}
        </Col>
      </Row>
    </>
  );
};
