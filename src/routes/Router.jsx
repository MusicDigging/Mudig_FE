import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PrivateRoute from './PrivateRoutes';

import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import MyProfile from '../pages/Profile/MyProfile';
import NewPlaylistQuestion1 from '../pages/NewPlaylist/Create/NewPlaylistQuestion1';
import NewPlaylistQuestion2 from '../pages/NewPlaylist/Create/NewPlaylistQuestion2';
import NewPlaylistQuestion3 from '../pages/NewPlaylist/Create/NewPlaylistQuestion3';
import EditProfile from '../pages/Profile/EditProfile';
import NewPlaylist from '../pages/NewPlaylist/NewPlaylist';
import SearchResult from '../pages/Search/SearchResult';

export function Router() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path='/' element='' />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/main' element={<Home />} />
          <Route path='/search' element={<SearchResult />} />
          <Route path='/user/profile' element={<MyProfile />} />
          <Route path='/user/profile/edit' element={<EditProfile />} />
          <Route path='/playlist/create' element={<NewPlaylist />} />
            <Route path='/playlist/create' element={<NewPlaylistQuestion1 />} />
            <Route path='/playlist/create2' element={<NewPlaylistQuestion2 />} />
            <Route path='/playlist/create3' element={<NewPlaylistQuestion3 />} />
          </Route>
        </Routes>
    </AnimatePresence>
  );
}
