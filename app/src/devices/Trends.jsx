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
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Power'
        }
    }
}

//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
/*
const data = {
    labels: labels,
    datasets: [{
        label: 'House Load',
        backgroundColor: '#4285F4',
        data: [30, 39, 10, 50, 30, 70, 35]
    }]
};
 */
export const Trends = ({device}) => {
    const [labels, setLabels] = useState([]);
    const [homePower, setHomePower] = useState([]);
    const timerIdRef = useRef(null);

    useEffect(() => {
        const pollingCB = () => {
            deviceService.getHistory(device.id).then((data) => {
                const a = data.map(item => {
                    return dayjs(item.timestamp).format('hh:mm')
                });
                const b = data.map(item => item.data.home.power);
                setLabels(a);
                setHomePower(b);
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
        return () => startPolling();
    }, []);

  return (
    <>
      <h5>Trending</h5>
        <Line options={options} data={{
            labels: labels,
            datasets: [{
                label: 'House Load (kW)',
                backgroundColor: '#4285F4',
                data: homePower,
            }]
        }}/>
    </>
  );

};
