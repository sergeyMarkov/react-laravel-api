import React from 'react';
import AddressList from '../components/AddressList';
import Logout from '../components/Logout';

function Dashboard() {

    return (
        <div className="container">
            <div className="col-md-4">
                <Logout />
                <h1>Dashboard</h1>
                <AddressList />
            </div>
        </div>
    )
}

export default Dashboard;