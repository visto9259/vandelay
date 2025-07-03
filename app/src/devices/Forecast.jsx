import React, {useEffect, useState} from 'react';
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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
//  Line
);

const deviceService= new DeviceService();

const options = {
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Forecast'
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'kW',
      },
      min: -20,
      max: 20,
    },
  },
}

export const Forecast = ({device}) => {

  const [lastTimeUpdate, setLastTimeUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gridForecast, setGridForecast] = useState([]);
  const [homeLoadForecast, setHomeLoadForecast] = useState([]);
  const [pvForecast, setPvForecast] = useState([]);
  const [essForecast, setEssForecast] = useState([]);
  const [labels, setLabels] = useState([])

  useEffect(() => {
    if (device) {
      setLoading(true);
      deviceService.getForecast(device.id).then((data) => {
        const a = data.forecast.map(item => {
          return dayjs(item.timestamp).format('hh:mm')
        });
        setLabels(a);
        setLastTimeUpdate(data.timestamp);
        setGridForecast(data.forecast.map((item) => item.gridPower/1000));
        setHomeLoadForecast(data.forecast.map((item) => item.homePower/1000));
        setPvForecast(data.forecast.map((item) => item.pvPower/1000));
        setEssForecast(data.forecast.map((item) => item.essPower/1000));
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
          <p>Last update: {dayjs(lastTimeUpdate).format('lll')}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Forecast</h5>
          <Line
            options={options}
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Grid Net (kW)',
                  backgroundColor: '#e3042b',
//                  backgroundColor: 'red',
                  data: gridForecast,
                },
                {
                  label: 'House Load (kW)',
                  backgroundColor: '#00028c',
                  data: homeLoadForecast,
                },
                {
                  label: 'PV Power (kW)',
                  backgroundColor: '#1ad912',
                  data: pvForecast,
                },
                {
                  label: 'ESS Power (kW)',
                  backgroundColor: '#34d9f1',
                  data: essForecast,
                },
              ]
            }}
          />
        </Col>
      </Row>
    </>
  );

};
