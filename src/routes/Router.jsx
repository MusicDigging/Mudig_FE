import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoutes';

import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import MyProfile from '../pages/Profile/MyProfile';
import NewPlaylist from '../pages/NewPlaylist/NewPlaylist';
import PlaylistDetail from '../pages/PlaylistDetail/PlaylistDetail';
import PlaylistModify from '../pages/PlaylistModify/PlaylistModify';
export function Router() {
  return (
    <Routes>
      <Route path='/' element='' />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path='/main' element={<Home />} />
        <Route path='/user/profile' element={<MyProfile />} />
        <Route path='/playlist/detail'>
          <Route path=':id' element={<PlaylistDetail />} />
          <Route path=':id/edit' element={<PlaylistModify />} />
        </Route>
        <Route path='/playlist/create' element={<NewPlaylist />} />
      </Route>
    </Routes>
  );
}
