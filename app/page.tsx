
import Logout from '@/components/Logout';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async () => {
  const session = await getServerSession();
  console.log(session);
  
  return (
    <div>
      {session ?
       <>
       lofin successfully
     <Logout/>
       </>
      :
      <Logout/>
      }
    </div>
  );
};

export default page;