import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes as RouterSwitch } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    
    const [token, setToken] = useState('');
  
    const tokenHandler = (token: string) => {
        setToken(token);
        localStorage.setItem('token', JSON.stringify(token));
    }
  
    return (
        <div className="App">
            <BrowserRouter>
                <RouterSwitch>
                    <Route path="/" element={token ? <Dashboard /> : <Login tokenHandler={tokenHandler}/> } /> 
                </RouterSwitch>
            </BrowserRouter>
        </div>
    );
}

export default App;
