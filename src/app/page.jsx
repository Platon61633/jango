"use client"
import React, { useEffect, useState } from 'react';
import './global.css'
import { useRouter } from 'next/navigation';


const Page = () => {

    const router = useRouter()

    useEffect(
      ()=>{
        router.push('/login', { scroll: false })
      }
    )
  
  const [IsRegistr , SetIsRegistr] = useState(false);

  return(
    <div className='Page'>
      Ожидайте
    </div>
  );
};

export default Page