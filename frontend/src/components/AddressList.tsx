import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Address from '../models/Address';
import AddressItem from './AddressItem';

function AddressList() {

    const [addresses, setAddresses] = useState<Array<Address>>();

    useEffect(() => {
        
        const ApiDomainUrl = process.env.REACT_APP_API_DOMAIN;
        if (!ApiDomainUrl) { throw Error("Unauthorized API request"); }

        const ApiKey = process.env.REACT_APP_API_KEY;
        if (!ApiKey) { throw Error("Unauthorized API request"); }

        const user_id = localStorage.getItem('token');
        if (!user_id) { throw Error("Unauthorized API request"); }

        axios
            .create({ 
                validateStatus: function() { return true; },
                headers: { 'Authorization': ApiKey, 'user_id': JSON.parse(user_id) }
            })
            .get(`${ApiDomainUrl}/addresses`)
            .then(res => {
                setAddresses(res.data.data);
            })
    }, []);

    return (
        <>
            <h2>Addresses</h2>
            <div>
            {addresses && addresses.map((item: Address, i) => {
                return <AddressItem key={i} {...item} />
            })}
            </div>
        </>
    )
}

export default AddressList;