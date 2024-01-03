// useAxios hook
import {useState, useCallback} from 'react';

import Axios from '../api';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {useCookies} from 'react-cookie';
import {useRouter} from 'next/router';

interface fetchDataType {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
  params?: any;
  headers?: any;
  successDescription?: string;
  errorDescription?: string;
  errorTitle?: string;
  successTitle?: string;
  disableSuccessToast?: boolean;
  disableErrorToast?: boolean;
}

const useAxios = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const {toast} = useToast();
  const [, , removeCookie] = useCookies();
  const router = useRouter();
  const fetchData = useCallback(
    async ({
      url,
      method,
      body,
      params,
      headers,
      errorTitle,
      errorDescription,
      successTitle,
      successDescription,
      disableSuccessToast = false,
      disableErrorToast = false
    }: fetchDataType) => {
      setResponse(null);
      setError(null);
      setSuccess(false);
      setLoading(true);
      try {
        const res = await Axios({
          method,
          url,
          headers,
          data: body,
          params: params
        });
        setResponse(res.data);
        setSuccess(true);

        if (res?.data?.message)
          successDescription = res?.data?.message + successDescription;
        if (disableSuccessToast) return;
        toast({
          title: successTitle || 'Success',
          description: successDescription,
          variant: 'default'
        });
      } catch (err: any) {
        setError(err);
        // Log the error stack trace (for debugging purposes)
        console.log('Error Stack Trace:', err);

        let error_description = err?.response
          ? err.response.data.message
          : 'An error occurred ';
        setSuccess(false);
        if (disableErrorToast) return;
        toast({
          title: errorTitle || 'Error',
          description: error_description + ' ' + errorDescription,
          variant: 'destructive'
        });

        if (err?.response?.status === 401) {
          if (err.response.data.message === 'Email Required') {
            router.push('/welcome/setEmail');
          } else {
            removeCookie('accessToken');
            removeCookie('isTwoFactorDone');
            removeCookie('hasAccount');
            router.push('/welcome');
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [toast, removeCookie, router]
  );
  return {fetchData, response, error, loading, isSuccess};
};

export default useAxios;
