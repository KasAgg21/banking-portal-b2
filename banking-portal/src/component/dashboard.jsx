// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { fetchUserDetailsByEmail } from '../dashboard_controller.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, CardBody, CardTitle, CardText, Spinner } from 'react-bootstrap'; // Import necessary components
import jsPDF from 'jspdf';
import 'jspdf-autotable';



export default function Dashboard() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const email = "ramanraghav2.0@gmail.com";

    async function fetchData() {
        try {
            const data = await fetchUserDetailsByEmail(email);
            console.log(data.data);
            setUserDetails(data.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    }

    const generatePDF = async () => {
        if (!userDetails) {
            return;
        }

        const doc = new jsPDF();
        let yPos = 20;

        // Title and account details
        doc.text(`Account Statement for ${email}`, 20, yPos);
        yPos += 10;
        doc.text(`Balance: $${userDetails.balance.toFixed(2)} USD`, 20, yPos);
        yPos += 10;

        // Transaction table headers
        const headers = ["Name", "ID", "Status", "Amount", "Date"];
        const tableData = userDetails.transactions.map(transaction => [
            transaction.name,
            transaction.id,
            transaction.status,
            transaction.amount,
            transaction.date
        ]);

        // Calculate total money in and money out
        const totalMoneyIn = userDetails.transactions
            .filter(transaction => transaction.status === "Money In")
            .reduce((total, transaction) => total + parseFloat(transaction.amount.replace(/[^\d.-]/g, '')), 0);

        const totalMoneyOut = userDetails.transactions
            .filter(transaction => transaction.status === "Money Out")
            .reduce((total, transaction) => total + parseFloat(transaction.amount.replace(/[^\d.-]/g, '')), 0);

        // Transaction table
        doc.autoTable({
            startY: yPos,
            head: [headers],
            body: tableData,
            theme: 'grid'
        });

        yPos = doc.autoTable.previous.finalY + 10;

        // Totals
        doc.text(`Total Money In: $${totalMoneyIn.toFixed(2)} USD`, 20, yPos);
        yPos += 10;
        doc.text(`Total Money Out: $${Math.abs(totalMoneyOut).toFixed(2)} USD`, 20, yPos);
        yPos += 10;

        // Save PDF
        doc.save("account_statement.pdf");

        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('pdf', pdfBlob, 'account_statement.pdf');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }

    };

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
            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
}