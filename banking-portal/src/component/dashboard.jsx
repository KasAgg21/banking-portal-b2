// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchUserDetailsByEmail } from '../dashboard_controller.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, CardBody, CardTitle, CardText, Spinner } from 'react-bootstrap'; // Import necessary components

export default function Dashboard() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const email = "ramanraghav2.0@gmail.com";

    async function fetchData() {
        try {
            const data = await fetchUserDetailsByEmail(email);
            setUserDetails(data.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (!userDetails) {
        return <div>Error loading user details</div>;
    }

    const balanceText = userDetails.balance ? `$${userDetails.balance.toFixed(2)} USD` : "N/A";

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Good Morning ☀️</h1>
            <Card className="mb-4">
                <CardBody>
                    <CardTitle className="h5">Balance</CardTitle>
                    <CardText>{balanceText}</CardText>
                </CardBody>
            </Card>
            <h2 className="mb-4">Insights</h2>
            {/* Placeholder for insights */}
            <h2 className="mb-4">Favorite Transfers</h2>
            <ul>
                {userDetails.favouriteTransfers?.map((transfer, index) => (
                    <li key={index}>{transfer.name}</li>
                ))}
            </ul>
            <h2 className="mb-4">Transaction History</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails.transactions?.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.name}</td>
                            <td>{transaction.id}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}