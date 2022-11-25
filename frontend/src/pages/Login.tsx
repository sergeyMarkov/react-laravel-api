import React, { useState } from 'react';
import LoginDetails from '../models/LoginDetails';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

interface LoginProps {
    tokenHandler(userToken: any): any;
}

export default function Login(props: LoginProps) {
    
    const [state, setState] = useState<LoginDetails>({
        name: '',
        email: '',
        password: '',
        password_again: '',
        message: ''
    });
    
    const handleValidation = () => {
        let formIsValid = state.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        if (formIsValid) {
            setState({
                ...state,
                emailError: ""
            });
        } else {
            setState({
                ...state,
                emailError: "Email is not valid"
            });
        }
    }
    
    const handleLogin = (e: any) => {
        e.preventDefault();
        handleValidation();

        const ApiDomainUrl = process.env.REACT_APP_API_DOMAIN;
        if (!ApiDomainUrl) { throw Error("API domain URL is not defined in the configuration"); }

        const ApiKey = process.env.REACT_APP_API_KEY;
        if (!ApiKey) { throw Error("Unauthorized API request"); }

        axios
            .create({ 
                validateStatus: function() { return true; },
                headers: { 'Authorization': ApiKey }
                })
            .post(`${ApiDomainUrl}/login`, {
            email: state.email,
            password: state.password
        })
        .then(res => {
            const rData = res.data;
            if (rData.success === true) {
                props.tokenHandler(rData.data.uuid);
            } else {
                setState({
                    ...state,
                    message: rData.message // show failure message
                })
            }
        });
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <h1>Log in</h1>
                    <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                            type="email" 
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(event) => {
                            setState({
                                ...state,
                                email: event.target.value
                            })
                        }}/>
                        {state.emailError && 
                        <small id="emailHelp" className="text-danger form-text">
                            {state.emailError}
                        </small>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="password"
                            onChange={(event) => {
                            setState({
                                ...state,
                                password: event.target.value
                            })
                        }}/>
                    </div>
                    
                    {state.message && (<div className="alert alert-danger" role="alert">{state.message} </div>)}
                    
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}