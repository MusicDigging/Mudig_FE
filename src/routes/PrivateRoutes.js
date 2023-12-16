import React from 'react';
import { useRecoilValue } from 'recoil';

import { Outlet, Navigate } from 'react-router-dom';
import { isLoginAtom } from '../library/atom';
export default function PrivateRoute() {
  // 로그인 여부 확인
  const isLogin = useRecoilValue(isLoginAtom);

  return isLogin ? <Outlet /> : <Navigate to='/login' />;
}
