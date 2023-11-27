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
import CreateNewPlaylist1 from '../pages/NewPlaylist/Create/CreateNewPlaylist1';
import CreateNewPlaylist2 from '../pages/NewPlaylist/Create/CreateNewPlaylist2';
import CreateNewPlaylist3 from '../pages/NewPlaylist/Create/CreateNewPlaylist3';
import EditProfile from '../pages/Profile/EditProfile';
import SearchResult from '../pages/Search/SearchResult';
import ChangePassword from '../pages/UserInfo/ChangePassword';
import Resign from '../pages/UserInfo/UserLeave';
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
          <Route path='/user/profile' element={<MyProfile />} />
          <Route path='/playlist/create' element={<CreateNewPlaylist1 />} />
          <Route path='/playlist/create2' element={<CreateNewPlaylist2 />} />
          <Route path='/playlist/create3' element={<CreateNewPlaylist3 />} />
          <Route path='/user/profile/edit' element={<EditProfile />} />
          <Route
            path='/user/profile/edit/password'
            element={<ChangePassword />}
          />
          <Route path='/user/profile/edit/resign' element={<Resign />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
