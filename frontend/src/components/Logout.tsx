import React from 'react';
import { Link } from 'react-router-dom';

function Logout() {

    const handleClick = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <Link to="/" onClick={handleClick}>Logout</Link>
    )
}

export default Logout;