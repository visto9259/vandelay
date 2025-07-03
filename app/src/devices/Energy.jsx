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
import {Spinner} from "../components/index.js";

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
    animation: false,
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
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState([]);
    const [homeEnergy, setHomeEnergy] = useState([]);
    const timerIdRef = useRef(null);

    useEffect(() => {
        const pollingCB = () => {
            const queryOptions = {
                type: 'telemetryininterval',
                fromDate: dayjs().add(-1, 'day').toISOString(),
                toDate: dayjs().toISOString(),
            };
            deviceService.getHistory(device.id, queryOptions).then((data) => {
                setLabels(data.map(item => {
                    return dayjs(item.timestamp).format('hh:mm')
                }));
                setHomeEnergy(data.map(item => item.data.home.out));
                setLoading(false);
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

    if (loading) {
        return(
            <><Spinner show text={'Loading energy...'}/></>)
    }

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
