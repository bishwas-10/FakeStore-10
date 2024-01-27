import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn =false; // You should implement your own logic here

    if (!isLoggedIn) {
      router.push('/login'); // Redirect to the login page
    }
  }, []);

  return null;
};