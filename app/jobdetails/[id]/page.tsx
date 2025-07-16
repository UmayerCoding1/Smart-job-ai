'use client';
import { useParams } from 'next/navigation';
import React from 'react';

const JobDetails = () => {
    const {id}= useParams();
     console.log(id);
     
    return (
        <div>
            job details id: {id}
        </div>
    );
};

export default JobDetails;