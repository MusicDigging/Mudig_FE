import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PrivateRoute from './PrivateRoutes';

import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import SignupDetail from '../pages/Signup/SignupDetail';
import Login from '../pages/Login/Login';
import SetProfile from '../pages/SetProfile/SetProfile';
import EditProfile from '../pages/Profile/EditProfile';
import MyProfile from '../pages/Profile/MyProfile';
import OtherProfile from '../pages/Profile/OtherProfile';
import PlaylistDetail from '../pages/PlaylistDetail/PlaylistDetail';
import PlaylistSummary from '../pages/PlaylistSummary/PlaylistSummary';
import PlaylistModify from '../pages/PlaylistModify/PlaylistModify';
import CreatePlaylist1 from '../pages/CreatePlaylist/CreatePlaylist1';
import CreatePlaylist2 from '../pages/CreatePlaylist/CreatePlaylist2';
import CreatePlaylist3 from '../pages/CreatePlaylist/CreatePlaylist3';

import SearchResult from '../pages/Search/SearchResult';
import ChangePassword from '../pages/UserInfo/ChangePassword';
import Resign from '../pages/UserInfo/UserLeave';
import Follow from '../pages/Profile/Follow';
import Splash from '../pages/Splash/Splash';
import NotFound from '../pages/NotFound/NotFound';
import RandomMusic from '../pages/RandomMusic/RandomMusic';
import Intro from '../pages/Home/Intro';
import SearchResultByType from '../components/Search/SearchResultByType';

export function Router() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/register/detail' element={<SignupDetail />} />
        <Route path='/setprofile' element={<SetProfile />} />
        <Route element={<PrivateRoute />}>
          <Route path='/main' element={<Home />} />
          <Route path='/intro' element={<Intro />} />
          <Route path='/search' element={<SearchResult />}>
            <Route index element={<SearchResultByType />} />
          </Route>
          <Route path='/randomplay' element={<RandomMusic />} />
          <Route path='/playlist/create1' element={<CreatePlaylist1 />} />
          <Route path='/playlist/create2' element={<CreatePlaylist2 />} />
          <Route path='/playlist/create3' element={<CreatePlaylist3 />} />
          <Route path='/playlist/summary' element={<PlaylistSummary />} />
          <Route path='/user/profile/edit' element={<EditProfile />} />
          <Route path='/user/profile/follow' element={<Follow />} />
          <Route path='/user/profile/edit/resign' element={<Resign />} />
          <Route path='/user/profile' element={<Outlet />}>
            <Route path='my' element={<MyProfile />} />
            <Route path=':id' element={<OtherProfile />} />
            <Route path='edit' element={<EditProfile />} />
            <Route path='edit/password' element={<ChangePassword />} />
            <Route path='edit/resign' element={<Resign />} />
          </Route>
          <Route path='/playlist/detail'>
            <Route path='' element={<PlaylistDetail />} />
            <Route path='edit' element={<PlaylistModify />} />
          </Route>
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
