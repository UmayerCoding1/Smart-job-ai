
'use client'
import React from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
const page = () => {

    const getCompany = async () => {
        const res =await axios.get('/api/company/687335c23aba454b97914999');
        console.log(res);
        
    }
    return (
        <div>
            <h1>Test APIs</h1>


            <Button onClick={() => getCompany()}>Get company</Button>
        </div>
    );


};

export default page;