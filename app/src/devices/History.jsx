import React, {useEffect} from 'react';
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import {DeviceService} from "../chorus/index.js";

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
            text: 'Chart.js Bar Chart'
        }
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: '#4285F4',
        data: [30, 39, 10, 50, 30, 70, 35]
    }]
};

export const History = ({device}) => {

    const [history, setHistory] = React.useState([]);

    useEffect(() => {
        deviceService.getHistory(device.id).then((data) => {
            console.log(data);
        })
    }, []);

  return (
    <>
      <h5>History</h5>
        <Bar options={options} data={data}/>
    </>
  );

};
