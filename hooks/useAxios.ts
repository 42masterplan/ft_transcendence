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
        // console.log('Error Stack Trace:', err);

        setSuccess(false);

        if (err?.response?.status === 401) {
          if (err.response.data.message === 'Email Required') {
            router.push('/welcome/setEmail');
          } else {
            removeCookie('accessToken', {path: '/'});
            if (!disableErrorToast)
              toast({
                title: '재로그인 필요',
                description:
                  '다시 로그인해주세요. 로그인 정보가 만료되었습니다.'
              });
            router.push('/welcome', undefined, {shallow: true});
          }
        } else if (err?.response?.status === 404) {
          router.push('/404');
        } else {
          if (!disableErrorToast)
            toast({
              title: errorTitle || 'Error',
              description: errorDescription,
              variant: 'default'
            });
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
