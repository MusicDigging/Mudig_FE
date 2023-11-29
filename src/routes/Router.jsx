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
import NewPlaylist from '../pages/NewPlaylist/NewPlaylist';
import PlaylistDetail from '../pages/PlaylistDetail/PlaylistDetail';
import PlaylistSummary from '../pages/PlaylistSummary/PlaylistSummary';
import PlaylistModify from '../pages/PlaylistModify/PlaylistModify';
import CreateNewPlaylist1 from '../pages/NewPlaylist/Create/CreateNewPlaylist1';
import CreateNewPlaylist2 from '../pages/NewPlaylist/Create/CreateNewPlaylist2';
import CreateNewPlaylist3 from '../pages/NewPlaylist/Create/CreateNewPlaylist3';
import EditProfile from '../pages/Profile/EditProfile';
import SearchResult from '../pages/Search/SearchResult';
import ChangePassword from '../pages/UserInfo/ChangePassword';
import Resign from '../pages/UserInfo/UserLeave';
import RandomMusic from '../pages/RandomMusic/RandomMusic';
import Intro from '../pages/Home/Intro';
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
          <Route path='/intro' element={<Intro />} />
          <Route path='/search' element={<SearchResult />} />
          <Route path='/randomplay' element={<RandomMusic />} />
          <Route path='/user/profile' element={<MyProfile />} />
          <Route path='/playlist/create' element={<CreateNewPlaylist1 />} />
          <Route path='/playlist/create2' element={<CreateNewPlaylist2 />} />
          <Route path='/playlist/create3' element={<CreateNewPlaylist3 />} />
          <Route path='/playlist/summary' element={<PlaylistSummary />} />
          <Route path='/user/profile/edit' element={<EditProfile />} />
          <Route
            path='/user/profile/edit/password'
            element={<ChangePassword />}
          />
          <Route path='/user/profile/edit/resign' element={<Resign />} />
          <Route path='/playlist/detail'>
            <Route path=':id' element={<PlaylistDetail />} />
            <Route path=':id/edit' element={<PlaylistModify />} />
          </Route>
          <Route path='/playlist/create' element={<NewPlaylist />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
