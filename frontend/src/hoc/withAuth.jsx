'use client';
import {  useEffect, useLayoutEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import LoadingBall from '@/components/general/loading/loadingBall';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); 

    useLayoutEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        redirect('/login'); // Immediate redirection if no token
      } else {
        setIsCheckingAuth(false); //Authentication completed
      }
    }, []);

    // Display nothing until authentication is complete
    if (isCheckingAuth) {
      return <LoadingBall/>
    ;
    }

    // Otherwise, we render the protected component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
