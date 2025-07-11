import React, {useEffect, useRef, useState} from 'react';
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
      min: -10,
      max: 10,
    },
  },
}

export const Forecast = ({device}) => {

  const [lastTimeUpdate, setLastTimeUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gridForecast, setGridForecast] = useState([]);
  const [homeLoadForecast, setHomeLoadForecast] = useState([]);
  const [pvForecast, setPvForecast] = useState([]);
  const [essForecast, setEssForecast] = useState([]);
  const [labels, setLabels] = useState([])
  const timerIdRef = useRef(null);
  const {configuration} = device;
  const {timeZone} = configuration.dcbel.timeZone;

  useEffect(() => {
    const pollingCB = () => {
      setLoading(true);
      deviceService.getForecast(device.id).then((data) => {
        const a = data.forecast.map(item => {
          return dayjs(item.timestamp).tz(timeZone).format('HH:mm')
        });
        setLabels(a);
        setLastTimeUpdate(data.timestamp);
        setGridForecast(data.forecast.map((item) => item.gridPower/1000));
        setHomeLoadForecast(data.forecast.map((item) => item.homePower/1000));
        setPvForecast(data.forecast.map((item) => item.pvPower/1000));
        setEssForecast(data.forecast.map((item) => item.essPower/1000));
        setLoading(false);
      });
    }
    const startPolling = () => {
      timerIdRef.current = setInterval(pollingCB, 1000*60*5);
    }
    const stopPolling = () => {
      clearInterval(timerIdRef.current);
    }

    pollingCB();
    startPolling();
    return () => stopPolling();

  }, [])

  if (loading) {
    return(
      <><Spinner show text={'Loading forecast...'}/></>)
  }

  return (
    <>
      <Row>
        <Col>
          <h5>Forecast</h5>
          <p><small>Last update: {dayjs(lastTimeUpdate).tz(timeZone).format('HH:mm Z')}</small></p>
          <Line
            options={options}
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Grid Net (kW)',
                  borderColor: '#e3042b',
                  backgroundColor: '#e3042b',
                  data: gridForecast,
                  pointStyle: false
                },
                {
                  label: 'House Load (kW)',
                  borderColor: '#00028c',
                  backgroundColor: '#00028c',
                  pointStyle: false,
                  data: homeLoadForecast,
                },
                {
                  label: 'PV Power (kW)',
                  borderColor: '#1ad912',
                  backgroundColor: '#1ad912',
                  pointStyle: false,
                  data: pvForecast,
                },
                {
                  label: 'ESS Power (kW)',
                  borderColor: '#34d9f1',
                  backgroundColor: '#34d9f1',
                  pointStyle: false,
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
