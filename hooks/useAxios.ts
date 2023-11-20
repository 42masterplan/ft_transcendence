// useAxios hook
import {useState, useCallback} from 'react';

import Axios from '../api';
import {useToast} from '@/components/shadcn/ui/use-toast';

interface fetchDataType {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
  params?: any;
  headers?: any;
  errorDescription?: string;
  successMsg?: string;
  errorTitle?: string;
  successTitle?: string;
  disableSuccessToast?: boolean;
  disableErrorToast?: boolean;
}

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const [isSuccess, setSuccess] = useState(false);

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
      successMsg,
      disableSuccessToast = false,
      disableErrorToast = false
    }: fetchDataType) => {
      setLoading(true);
      try {
        const res = await Axios({
          method,
          url,
          headers,
          data: body,
          params
        });
        setResponse(res.data);
        setSuccess(true);

        // Log the response data (for debugging purposes)
        console.log('Response Data:', res.data);

        if (disableSuccessToast) return;
        toast({
          title: successTitle || 'Success',
          description: res.data.message + successMsg,
          variant: 'default'
        });
      } catch (err: any) {
        setError(err);

        // Log the error stack trace (for debugging purposes)
        console.error('Error Stack Trace:', err);

        let error_description = err.response
          ? err.response.data.message
          : 'An error occurred ';
        setSuccess(false);
        if (disableErrorToast) return;
        toast({
          title: errorTitle || 'Error',
          description: error_description + errorDescription,
          variant: 'destructive'
        });
      } finally {
        setloading(false);
      }
    },
    [toast]
  );

  return {fetchData, response, error, loading, isSuccess};
};

export default useAxios;
