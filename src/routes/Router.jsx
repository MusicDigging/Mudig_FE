import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PrivateRoute from './PrivateRoutes';

import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import SignupDetail from '../pages/Signup/SignupDetail';
import Login from '../pages/Login/Login';
import SetProfile from '../pages/SetProfile/SetProfile';
import MyProfile from '../pages/Profile/MyProfile';
import NewPlaylistQuestion1 from '../pages/NewPlaylist/Create/NewPlaylistQuestion1';
import NewPlaylistQuestion2 from '../pages/NewPlaylist/Create/NewPlaylistQuestion2';
import NewPlaylistQuestion3 from '../pages/NewPlaylist/Create/NewPlaylistQuestion3';
import EditProfile from '../pages/Profile/EditProfile';
import SearchResult from '../pages/Search/SearchResult';
import ChangePassword from '../pages/UserInfo/ChangePassword';
import Resign from '../pages/UserInfo/UserLeave';
import RandomMusic from '../pages/RandomMusic/RandomMusic';
export function Router() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path='/' element='' />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/register/detail' element={<SignupDetail />} />
        <Route path='/setprofile' element={<SetProfile />} />
        <Route element={<PrivateRoute />}>
          <Route path='/main' element={<Home />} />
          <Route path='/search' element={<SearchResult />} />
          <Route path='/randomplay' element={<RandomMusic />} />
          <Route path='/user/profile' element={<MyProfile />} />
          <Route path='/user/profile/edit' element={<EditProfile />} />
          <Route
            path='/user/profile/edit/password'
            element={<ChangePassword />}
          />
          <Route path='/user/profile/edit/resign' element={<Resign />} />
          <Route path='/playlist/create' element={<NewPlaylistQuestion1 />} />
          <Route path='/playlist/create2' element={<NewPlaylistQuestion2 />} />
          <Route path='/playlist/create3' element={<NewPlaylistQuestion3 />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
