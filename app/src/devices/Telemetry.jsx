import React, {useEffect, useRef} from 'react';
import {DeviceService} from "../chorus/index.js";
import {Spinner} from "../components/index.js";
import {Col, Row} from "react-bootstrap";
import dayjs from 'dayjs';
import {min} from "@popperjs/core/lib/utils/math.js";

const deviceService = new DeviceService();

export const Telemetry = ({device}) => {

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

  const {home, hem, dcbel} = telemetry.data;
  const {timestamp} = telemetry;
  const {ess, pv, ev} = dcbel;
  const homePower = parseFloat(home.power)/1000;
  const hemPower = parseFloat(hem.power)/1000;
  const essPower = ess ? ess[0].power/1000 : 0;
  const pvPower = pv ? pv[0].power/1000 : 0;
  const evAC = ev ? ev.find((e) => e.currentType === 'AC') : null;
  const evDC = ev ? ev.find((e) => e.currentType === 'DC') : null;

  const _calculatePrivateGrid = () => {
      let load = home.power;
      if (evAC && evAC.state === 'Charging') {
          load += evAC.power;
      }
      if (evDC && evDC.state === 'Charging') {
          load += evDC.power;
      }
      return Math.min((load - hem.power)/load*100, 100);
    }

    const netZero = _calculatePrivateGrid();

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
              <p className="mb-1">Current: {parseFloat(home.current).toFixed(2)} A</p>
            </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>Grid</h6>
              <p className="mb-1">Power: <span className={hem.power>0 ? "text-danger fw-bold" : "text-success fw-bold" }>{hemPower.toFixed(2)} kW</span></p>
              <p className="mb-1">Voltage: {hem.voltage ? parseFloat(hem.voltage).toFixed(2)+ 'V' : 'No data'}</p>
              <p className="mb-1">L1 Current: {parseFloat(hem.curL1).toFixed(2)} A</p>
              <p className="mb-1">L2 Current: {parseFloat(hem.curL2).toFixed(2)} A</p>
                <p className="mb-1">Private Grid: <span className={(netZero>=85) ? "text-success fw-bold"
                    : (netZero <85 && netZero >=25) ? "text-warning fw-bold"
                        : "text-danger fw-bold"
                }>
                    {netZero.toFixed(2)}%
                </span>
                </p>
            </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>ESS</h6>
              {ess && (
                  <>
                    <p className="mb-1">State: {ess[0].state}</p>
                    <p className="mb-1">Power: {essPower.toFixed(2)} kW</p>
                    <p className="mb-1">Voltage: {parseFloat(ess[0].voltage).toFixed(2)} V</p>
                    <p className="mb-1">SoC: {parseFloat(ess[0].soc).toFixed(2)}%</p>
                    <p className="mb-1">Energy: {parseFloat(ess[0].energyRemaining/1000).toFixed(2)} kWh</p>
                  </>
                  )}
              {!ess && (
                  <>
                    <p className="mb-1">State: Not connected</p>
                  </>
                  )}
            </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>PV</h6>
              {pv && (
                  <>
                    <p className="mb-1">Power: {parseFloat(pvPower).toFixed(2)} kW</p>
                    <p className="mb-1">Voltage: {parseFloat(pv[0].voltage).toFixed(2)} V</p>
                  </>
                  )}
              {!pv && (
                  <>
                    <p className="mb-1">State: Not connected</p>
                  </>
                  )}
            </Col>
          </Row>
          <Row>
              <Col className="m-1 border border-1 border-secondary">
                <h6>EV AC</h6>
                {evAC && (
                    <>
                        <p className="mb-1">State: <span className={evAC.state === 'Charging' ? "text-warning fw-bold": ""}>{evAC.state}</span></p>
                        <p className="mb-1">Power: {parseFloat(evAC.power/1000).toFixed(2)} kW</p>
                        <p className="mb-1">Current: {parseFloat(evAC.current)} A</p>
                        <p className="mb-1">Voltage: {parseFloat(evAC.voltage)} V</p>
                    </>
                )}
                {!evAC && (
                  <>
                    <p className="mb-1">State: Not connected</p>
                  </>
                )}
              </Col>
            <Col className="m-1 border border-1 border-secondary">
              <h6>EV DC</h6>
              {evDC && (
                <>
                    <p className="mb-1">State: <span className={(evDC.state === 'Charging') ? "text-warning fw-bold" :
                            (evDC.state === 'Discharging') ? "text-success fw-bold" :
                                (evDC.state === 'Supercharging') ? "text-primary fw-bolder" : ""}>
                            {evDC.state}
                        </span>
                    </p>
                    <p className="mb-1">Power: {parseFloat(evDC.power/1000).toFixed(2)} kW</p>
                    <p className="mb-1">Power Reserve: {evDC.powerReserve} kWh</p>
                    <p className="mb-1">Energy Remaining: {parseFloat(evDC.energyRemaining/1000)} kWh</p>
                    <p className="mb-1">SoC: {evDC.soc}%</p>
                    <p className="mb-1">Voltage: {parseFloat(evDC.voltage)} V</p>
                    <p className="mb-1">Current: {parseFloat(evDC.current)} A</p>
                </>
              )}
              {!evDC && (
                <>
                  <p className="mb-1">State: Not connected</p>
                </>
              )}
            </Col>
          </Row>
        </>}
    </>
  );

};
