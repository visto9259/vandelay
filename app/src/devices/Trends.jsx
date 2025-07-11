import React, {useEffect, useRef, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend, PointElement,
} from "chart.js";
import {Bar, Line} from "react-chartjs-2";
import {DeviceService} from "../chorus/index.js";
import dayjs from "dayjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
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
            text: 'Power'
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

export const Trends = ({device}) => {
    const [labels, setLabels] = useState([]);
    const [homePower, setHomePower] = useState([]);
    const [pvPower, setPvPower] = useState([]);
    const [essPower, setEssPower] = useState([]);
    const [gridPower, setGridPower] = useState([]);
    const timerIdRef = useRef(null);
    const {timeZone} = device.configuration.dcbel.timeZone;
    const [lastUpdate, setLastUpdate] = useState(dayjs().tz(timeZone).format('HH:mm:ss Z'));

    useEffect(() => {
        const pollingCB = () => {
            const queryOptions = {
                fromDate: dayjs().add(-10, 'minute').toISOString(),
                toDate: dayjs().toISOString(),
                pageSize: 500,
            };
            deviceService.getHistory(device.id, queryOptions).then((data) => {
                setLabels(data.map(item => {
                    return dayjs(item.timestamp).tz(timeZone).format('hh:mm')
                }));
                setHomePower(data.map(item => item.data.home.power/1000));
                setPvPower(data.map(item => item.data.dcbel.pv[0].power/1000));
                setEssPower(data.map(item => item.data.dcbel.ess[0].power/1000));
                setGridPower(data.map(item => item.data.hem.power/1000));
                setLastUpdate(dayjs().tz(timeZone).format('HH:mm:ss Z'));
            })
        }
        const startPolling = () => {
            timerIdRef.current = setInterval(pollingCB, 1000*60*2);
        }
        const stopPolling = () => {
            clearInterval(timerIdRef.current);
        }
        pollingCB();
        startPolling();
        return () => stopPolling();
    }, []);

  return (
    <>
      <h5>Trending</h5>
        <p><small>Last update: {lastUpdate}</small></p>
        <Line options={options} data={{
            labels: labels,
            datasets: [
                {
                    label: 'House Load',
                    backgroundColor: '#4285F4',
                    borderColor: '#4285F4',
                    pointStyle: false,
                    data: homePower,
                },
                {
                    label: 'PV Power',
                    backgroundColor: '#1ad912',
                    borderColor: '#1ad912',
                    pointStyle: false,
                    data: pvPower,
                },
                {
                    label: 'ESS Power',
                    backgroundColor: '#34d9f1',
                    borderColor: '#34d9f1',
                    pointStyle: false,
                    data: essPower,
                },
                {
                    label: 'Grid Power',
                    backgroundColor: '#e3042b',
                    borderColor: '#e3042b',
                    pointStyle: false,
                    data: gridPower,
                },
            ]
        }}/>
    </>
  );

};
