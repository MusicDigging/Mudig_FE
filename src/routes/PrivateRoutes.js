import React from 'react';
import { useRecoilValue } from 'recoil';

import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  // 로그인 여부 확인

  // const isLogin = useRecoilValue(false); // Recoil로 관리 중인 로그인 상태값으로 교체

  const isLogin = true;

  return isLogin ? <Outlet /> : <Navigate to='/login' />;
}
