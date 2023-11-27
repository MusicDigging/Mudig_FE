import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoutes';

import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import MyProfile from '../pages/Profile/MyProfile';
import EditProfile from '../pages/Profile/EditProfile';
import NewPlaylist from '../pages/NewPlaylist/NewPlaylist';
import Follow from '../pages/Profile/Follow';
import Splash from '../pages/Splash/Splash';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Splash />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path='/main' element={<Home />} />
        <Route path='/user/profile' element={<MyProfile />} />
        <Route path='/user/profile/edit' element={<EditProfile />} />
        <Route path='/user/profile/follow' element={<Follow />} />
        <Route path='/playlist/create' element={<NewPlaylist />} />
      </Route>
    </Routes>
  );
}
