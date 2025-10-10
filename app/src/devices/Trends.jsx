import React, {useEffect, useRef, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend, PointElement, TimeSeriesScale,
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
    Legend,
    TimeSeriesScale,
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
        x: {
            /*
            type: 'time',
            time: {
                unit: 'second',
                stepSize: 10,
//                displayFormat: 'HH:mm:ss',
            }

             */
        },
    },
}

export const Trends = ({device}) => {
    const [labels, setLabels] = useState([]);
    const [homePower, setHomePower] = useState([]);
    const [pvPower, setPvPower] = useState([]);
    const [essPower, setEssPower] = useState([]);
    const [gridPower, setGridPower] = useState([]);
    const [evAcPower, setEvAcPower] = useState([]);
    const [evDcPower, setEvDcPower] = useState([]);
    const timerIdRef = useRef(null);
    const {timeZone} = device.configuration.dcbel.timeZone;
    const [lastUpdate, setLastUpdate] = useState(dayjs().tz(timeZone).format('HH:mm:ss Z'));
    const nbTimeSlots = 360;

    useEffect(() => {
        const pollingCB = () => {
            const queryOptions = {
                fromDate: dayjs().add(-30, 'minute').toISOString(),
                toDate: dayjs().toISOString(),
                pageSize: 500,
            };
            deviceService.getHistory(device.id, queryOptions).then((data) => {
                _processTelemetryData(data, 360);
                setLabels(data.map(item => {
                    return dayjs(item.timestamp).tz(timeZone).format('hh:mm:ss')
                }));
                setHomePower(data.map(item => item.data.home.power/1000));
                setPvPower(data.map(item => item.data.dcbel.pv[0].power/1000));
                setEssPower(data.map(item => item.data.dcbel.ess[0].power/1000));
                setGridPower(data.map(item => item.data.hem.power/1000));
                setEvAcPower(data.map((item) => {
                    const evAC = item.data.dcbel.ev.filter(item => item.currentType === 'AC');
                    return evAC.length>0 ? evAC[0].power/1000 : 0;
                }));
                setEvDcPower(data.map((item) => {
                    const evDC = item.data.dcbel.ev.filter(item => item.currentType === 'DC');
                    return evDC.length>0 ? evDC[0].power/1000 : 0;
                }));
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

    /**
     * @param data
     * @param {number} nbTimeSlots
     */
    const _processTelemetryData = (data, nbTimeSlots) => {

        let timeSlots = [];
        let initialTime = dayjs().add(-30, 'minute');
        for (let i = 0; i < nbTimeSlots; i++) {
            timeSlots[i] = initialTime;
            initialTime = initialTime.add(5, 'second');
        }
        return timeSlots;
    }

  return (
    <>
      <h5>Trending</h5>
        <p><small>Last update: {lastUpdate}</small></p>
        <Line options={options} data={{
            labels: labels,
            datasets: [
                {
                    label: 'House',
                    backgroundColor: '#4285F4',
                    borderColor: '#4285F4',
                    pointStyle: false,
                    data: homePower,
                },
                {
                    label: 'PV',
                    backgroundColor: '#1ad912',
                    borderColor: '#1ad912',
                    pointStyle: false,
                    data: pvPower,
                },
                {
                    label: 'ESS',
                    backgroundColor: '#34d9f1',
                    borderColor: '#34d9f1',
                    pointStyle: false,
                    data: essPower,
                },
                {
                    label: 'Grid',
                    backgroundColor: '#e3042b',
                    borderColor: '#e3042b',
                    pointStyle: false,
                    data: gridPower,
                },
                {
                    label: 'EV DC',
                    backgroundColor: '#095b07',
                    borderColor: '#095b07',
                    pointStyle: false,
                    data: evDcPower,
                },
                {
                    label: 'EV AC',
                    backgroundColor: '#e3bd20',
                    borderColor: '#e3bd20',
                    pointStyle: false,
                    data: evAcPower,
                },
            ]
        }}/>
    </>
  );

};
