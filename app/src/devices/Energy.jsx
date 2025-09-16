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
import {Dropdown} from "react-bootstrap";

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
            text: 'Energy (Wh)'
        }
    },
    /*
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        }
    }
    
     */
}

export const Energy = ({device}) => {
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState([]);
    const [homeEnergy, setHomeEnergy] = useState([]);
    const [PVEnergy, setPVEnergy] = useState([]);
    const [ESSEnergy, setESSEnergy] = useState([]);
    const timerIdRef = useRef(null);
    const {timeZone} = device.configuration.dcbel.timeZone;
    const [lastUpdate, setLastUpdate] = useState(dayjs().tz(timeZone).format('HH:mm:ss Z'));
    const [selector, setSelector] = useState('last-hour');

    useEffect(() => {
        const pollingCB = () => {
            const queryOptions = {
                type: 'telemetryininterval',
                fromDate: selector === 'last-hour' ? dayjs().add(-1, 'hour').toISOString() : dayjs().add(-1, 'day').toISOString(),
                toDate: dayjs().toISOString(),
            };
            setLoading(true);
            deviceService.getHistory(device.id, queryOptions).then((data) => {
                setLabels(data.map(item => {
                    return dayjs(item.timestamp).tz(timeZone).format('HH:mm')
                }));
                setHomeEnergy(data.map(item => item.data.home.out));
                setPVEnergy(data.map(item => item.data.pv.in));
                setESSEnergy(data.map(item => item.data.ess.out));
                setLastUpdate(dayjs().tz(timeZone).format('HH:mm:ss Z'));
                setLoading(false);
            })
        }
        const startPolling = () => {
            timerIdRef.current = setInterval(pollingCB, 1000*60*2);
        }
        const stopPolling = () => {
            clearInterval(timerIdRef.current);
        }
        if (timerIdRef.current) {stopPolling()}
        pollingCB();
        startPolling();
        return () => stopPolling();
    }, [selector]);

    if (loading) {
        return(
            <><Spinner show text={'Loading energy...'}/></>)
    }

    const _renderSelector = (selector) => {
        switch (selector) {
            case 'last-hour':
            default:
                return 'Last hour';
            case 'last-day':
                return 'Last day';
        }
    }

    const _chooseSelector = (selector) => {
        switch (selector) {
            case 'last-hour':
                default:
                    selector = 'last-hour';
        }
    }

  return (
    <>
      <h5>Energy</h5>
        <p>Last update: {lastUpdate}</p>
        <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="energy-interval">{_renderSelector(selector)}</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelector('last-hour')}>Last hour</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelector('last-day')}>Last day</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Bar options={options} data={{
            labels: labels,
            datasets: [
                {
                    label: 'House',
                    backgroundColor: '#4285F4',
                    data: homeEnergy,
                },
                {
                    label: 'PV',
                    backgroundColor: '#1ad912',
                    data: PVEnergy,
                },
                {
                    label: 'ESS',
                    backgroundColor: '#34d9f1',
                    data: ESSEnergy,
                },
            ]
        }}/>
    </>
  );

};
