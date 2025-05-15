import React, {useEffect} from 'react';
import {DeviceService} from "../chorus/index.js";
import {Spinner} from "../components/Spinner.jsx";
import {Col, Row} from "react-bootstrap";
import dayjs from "dayjs";
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import {Line} from "react-chartjs-2";

/*
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Line
);
*/
const deviceService= new DeviceService();

export const Forecast = ({device}) => {

  const [forecast, setForecast] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [homeForecast, setHomeForecast] = React.useState([]);

  useEffect(() => {
    if (device) {
      setLoading(true);
      deviceService.getForecast(device.id).then((data) => {
        setForecast(data.forecast);
        setHomeForecast(data.forecast.map((item) => {item.homePower}));
        setLoading(false);
      })
    }
  }, [device])

  if (loading) {
    return(
      <><Spinner show text={'Loading forecast...'}/></>)
  }

  return (
    <>
      <Row>
        <Col>
          <h5>Forecast</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Last update: {dayjs(forecast.timestamp).format('lll')}</p>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </>
  );

};