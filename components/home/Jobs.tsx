import React, { useState } from 'react';
import Search from '../Search';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

const Jobs = () => {
     const searchData = useSelector((state: RootState ) => state.searchR.search);
     console.log(searchData);
     

    const handleSearch = (search: {jobTitle: string, location: string, jobType: string}) => {
        console.log(search);
    }
    return (
        <div className='max-w-7xl mx-auto '>
            <Search/>
            all jobs here
        </div>
    );
};

export default Jobs;