import React, {useEffect, useRef} from 'react';
import {DeviceService} from "../chorus/index.js";
import {Spinner} from "../components/index.js";
import {Col, Row} from "react-bootstrap";
import dayjs from 'dayjs';

const deviceService = new DeviceService();

export const Telemetry = ({deviceId, device}) => {

  const [telemetry, setTelemetry] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const timerIdRef = useRef(null);

  useEffect(()=>{
    const pollingCB = () => {
      deviceService.getTelemetry(device.id).then((data) => {
        setTelemetry(data);
        setLoading(false);
      });
    }
    const startPolling = () => {
      timerIdRef.current = setInterval(pollingCB, 5000);
    }
    const stopPolling = () => {
      clearInterval(timerIdRef.current);
    }

    if (device) {
      startPolling();
    }
    return () => {
      stopPolling();
    }
  },[device])

  if (loading) {
    return(
      <><Spinner show text={'Loading telemetry...'}/></>)
  }

  const {home, hem, s, dcbel, ats} = telemetry.data;
  const {timestamp} = telemetry;
  const {ess, pv, ev} = dcbel;
  const homePower = parseFloat(home.power)/1000;
  const hemPower = parseFloat(hem.power)/1000;
  const netZero = (homePower-hemPower)/homePower*100;
  const essPower = ess[0].power/1000;
  const pvPower = pv[0].power/1000
  const evAC = ev.find((e) => e.currentType === 'AC');
  const evDC = ev.find((e) => e.currentType === 'DC');
  return (
    <>
      {loading && <Spinner show text={'Loading telemetry...'}/>}
      {!loading &&
        <>
          <Row>
            <Col>
              <h5>Telemetry</h5>
              <p>Last update: {dayjs(timestamp).format('HH:mm:ss')}</p>
            </Col>
          </Row>
          <Row>
            <Col className="m-1 border border-1 border-secondary">
              <h6>Home</h6>
              <p className="mb-1">Load: {homePower.toFixed(2)} kW</p>
              <p className="mb-1">Voltage: {parseFloat(home.voltage).toFixed(2)} V</p>
              <p>Current: {parseFloat(home.current).toFixed(2)} A</p>
            </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>Grid</h6>
              <p className="mb-1">Power: {hemPower.toFixed(2)} kW</p>
              <p className="mb-1">Voltage: {parseFloat(hem.voltage).toFixed(2)} V</p>
              <p className="mb-1">L1 Current: {parseFloat(hem.curL1).toFixed(2)} A</p>
              <p className="mb-1">L2 Current: {parseFloat(hem.curL2).toFixed(2)} A</p>
              <p>Net Zero: {netZero.toFixed(2)}%</p>
            </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>ESS</h6>
              <p className="mb-1">State: {ess[0].state}</p>
              <p className="mb-1">Power: {essPower.toFixed(2)} kW</p>
              <p className="mb-1">Voltage: {parseFloat(ess[0].voltage).toFixed(2)} V</p>
              <p className="mb-1">SoC: {parseFloat(ess[0].soc).toFixed(2)}%</p>
              <p className="mb-1">Energy: {parseFloat(ess[0].energyRemaining).toFixed(2)}Wh</p>
            </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>PV</h6>
              <p className="mb-1">Power: {parseFloat(pvPower).toFixed(2)} kW</p>
              <p className="mb-1">Voltage: {parseFloat(pv[0].voltage).toFixed(2)} V</p>
            </Col>
          </Row>
          <Row>
              <Col className="m-1 border border-1 border-secondary">
                <h6>EV AC</h6>
                {evAC && (
                  <>
                  <p className="mb-1">{evAC.state}</p>
                  <p className="mb-1">Power: {parseFloat(evAC.power).toFixed(2)} kW</p>
                  </>
                )}
                {!evAC && (
                  <>
                    <p className="mb-1">Not connected</p>
                  </>
                )}
              </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>EV DC</h6>
              {evDC && (
                <>
                  <p className="mb-1">{evDC.state}</p>
                  <p className="mb-1">Power: {parseFloat(evDC.power).toFixed(2)} kW</p>
                  <p className="mb-1">SoC: {evDC.soc}%</p>
                </>
              )}
              {!evDC && (
                <>
                  <p className="mb-1">Not connected</p>
                </>
              )}
            </Col>
          </Row>
        </>}
    </>
  );

};