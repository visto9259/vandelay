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
    BarElement,
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
            text: 'Energy'
        }
    }
}

export const Energy = ({device}) => {
    const [labels, setLabels] = useState([]);
    const [homeEnergy, setHomeEnergy] = useState([]);
    const timerIdRef = useRef(null);

    useEffect(() => {
        const pollingCB = () => {
            deviceService.getHistory(device.id, {type: 'telemetryininterval'}).then((data) => {
                const a = data.map(item => {
                    return dayjs(item.timestamp).format('hh:mm')
                });
                const b = data.map(item => item.data.home.out);
                setLabels(a);
                setHomeEnergy(b);
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
      <h5>Energy</h5>
        <Bar options={options} data={{
            labels: labels,
            datasets: [{
                label: 'House (Wh)',
                backgroundColor: '#4285F4',
                data: homeEnergy,
            }]
        }}/>
    </>
  );

};
