import React from 'react';
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {Application} from "../chorus/index.js";
import {Col, Nav, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, Table} from "react-bootstrap";
import {BarChartSteps, Eyeglasses, Gear, House} from "react-bootstrap-icons";
import {Overview} from "./Overview.jsx";
import {Monitor} from "./Monitor.jsx";
import {Schedule} from "./Schedule.jsx";
import dayjs from "dayjs";

export const ApplicationDetails = () => {
  const {appId} = useParams();
  const application = useSelector(state => {
    const a= state.applications.applications.find((item) => item.id === appId);
    return a === undefined ? null : a;
  });
  const devices = useSelector(state => state.devices.devices);
  const [activeTab, setActiveTab] = React.useState('overview');

  const _deviceExist = (deviceId) => {
    const a = devices.find((device) => device.id === deviceId);
    return a !== undefined;
  }

  if (!application) {
    return (
      <>
      <Row>
        <Col>
          <h2>Oups!</h2>
          <p>Cannot find this device</p>
        </Col>
      </Row>
    </>
  );
  }

  const _navItemBackgroundColor = (selectedTab) => (activeTab === selectedTab) ? "bg-secondary text-white" : ""

  return (
    <>
      <Row className="mb-3">
        <h3>{application.versions[0].appName}</h3>
        <p className="my-1">Version: {application.versions[0].version}. Released: {dayjs(application.versions[0].release).format('LL')}</p>
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
                   }}
              >
                <Nav.Item className={_navItemBackgroundColor("overview")}>
                  <Nav.Link eventKey="overview" className="d-flex align-items-center gap-2 active">
                    <House/>
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className={_navItemBackgroundColor("schedules")}>
                  <Nav.Link eventKey="schedules" className="d-flex align-items-center gap-2">
                    <BarChartSteps/>
                    Schedules
                  </Nav.Link>
                </Nav.Item>
                {/*}
                <Nav.Item className={_navItemBackgroundColor("monitor")}>
                  <Nav.Link eventKey="monitor" className="d-flex align-items-center gap-2">
                    <Eyeglasses/>
                    Monitor
                  </Nav.Link>
                </Nav.Item>
                {*/}
                <hr className="my-1"/>
                <Nav.Item className={_navItemBackgroundColor("configure")}>
                  <Nav.Link disabled eventKey="configure" className="d-flex align-items-center gap-2">
                    <Gear/>
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
              case "overview":
                return <Overview application={application}/>;
              case "monitor":
                return <Monitor/>;
              case "schedules":
                return <Schedule application={application}/>;
            }
          })()}
        </Col>

      </Row>
    </>
  );

};