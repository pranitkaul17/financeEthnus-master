import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import fetchTransactions from '../Functions/Fetchtransactions';
import Chart from 'chart.js/auto';

const Graphs = () => {
    // e.preventDefault();
    // const user = useSelector((state) => state.user);
    // const userName = user.user.userName;

    const [transactionData, setTransactionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTransactions("AyushWaghe");  //Fetch transactions is stored as a function in different file and using it here for better knowledege
                setTransactionData(data);
            } catch (error) {
                // console.error('Error fetching transaction data:', error.message);
                console.log(error.message);
            }
        };

        fetchData();
    }, ["AyushWaghe"]);

    console.log(transactionData);

    console.log(transactionData.map(transaction => transaction.description));
    const chartData1 = {
        labels: transactionData.map(transaction => transaction.date),
        datasets: [
            {
                label: 'Amount',
                data: transactionData.map(transaction => transaction.cost),
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };
    const chartData2 = {
        labels: transactionData.map(transaction => transaction.description),
        datasets: [
            {
                label: 'Amount',
                data: transactionData.map(transaction => transaction.cost),
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    //   console.log(transactionData);

    return (
        <div className="GraphMaster">
        <div className="ColDiv">
                <h1>Graphs</h1>
            </div>
            <div className="ColDiv">
                <div className="BarGraph">
                    <Bar data={chartData1} />
                </div>
                <div className="BarGraph">
                    <Bar data={chartData2} />
                </div>
            </div>
            <div className="ColDiv">
                <div className="BarGraph">
                    <Bar data={chartData1} />
                </div>
                <div className="BarGraph">
                    <Bar data={chartData2} />
                </div>
            </div>


        </div>
    )

    // Rest of your component code
};


export default Graphs;
