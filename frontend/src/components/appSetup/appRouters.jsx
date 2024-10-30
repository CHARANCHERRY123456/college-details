// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import About from '../../pages/Content';
import Analytics from '../../pages/Analytics';
import DashBoards from '../../pages/DashBoards';
import Home from '../../pages/Home';
import New from '../../pages/New';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<Analytics/>} />
          <Route path="dashboards" element={<DashBoards/>} />
          <Route path="new" element={<New/>} />
          <Route path="content" element={<About />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
