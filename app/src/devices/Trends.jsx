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
        /*
        x: {
            type: 'time',
            time: {
                tooltipFormat: 'DD T'
            },
        },

         */
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

    useEffect(() => {
        const pollingCB = () => {
            const queryOptions = {
                fromDate: dayjs().add(-10, 'minute').toISOString(),
                toDate: dayjs().toISOString(),
                pageSize: 500,
            };
            deviceService.getHistory(device.id, queryOptions).then((data) => {
                setLabels(data.map(item => {
                    return dayjs(item.timestamp).format('hh:mm')
                }));
                setHomePower(data.map(item => item.data.home.power/1000));
                setPvPower(data.map(item => item.data.dcbel.pv[0].power/1000));
                setEssPower(data.map(item => item.data.dcbel.ess[0].power/1000));
                setGridPower(data.map(item => item.data.hem.power/1000));
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
            datasets: [
                {
                    label: 'House Load',
                    backgroundColor: '#4285F4',
                    data: homePower,
                },
                {
                    label: 'PV Power',
                    backgroundColor: '#1ad912',
                    data: pvPower,
                },
                {
                    label: 'ESS Power',
                    backgroundColor: '#34d9f1',
                    data: essPower,
                },
                {
                    label: 'Grid Power',
                    backgroundColor: '#e3042b',
                    data: gridPower,
                },
            ]
        }}/>
    </>
  );

};
