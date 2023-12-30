// This page will be redirected to logged in user's page.

import Router from 'next/router';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';

export default function HomePage() {
  const router = Router;
  const {fetchData, response, isSuccess, loading, error} = useAxios();

  // fetch data from server ----------------------------------------------------

  /**
   * API: GET /users/myName
   * @returns name: string
   * @description
   * * Get current user's name
   * * response:
   * * * name: string
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */
  useEffect(() => {
    fetchData({
      method: 'get',
      url: '/users/myName',
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.'
    });
  }, []);
  useEffect(() => {
    if (error === true) {
      // user not found -> redirect to 404 page
      router.push('/404');
    }
    if (isSuccess === true) {
      // when user is found -> redirect to user info page
      router.push(`/userInfo/${response.name}`);
    }
  }, [isSuccess, response]);

  return (
    <>
      <div>
        <SpinningLoader />
        <h2>This page will be redirected to your information page.</h2>
      </div>
    </>
  );
}
