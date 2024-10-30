// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import JobAndInternships from './Pages/JobAndInternships';
import PlacementPreparation from './Pages/PlacementPreparation';
import PlacementAnalytics from './Pages/PlacementAnalytics';
import Dashboard from './Pages/Dashboard';
import EventsWorkshops from './Pages/EventsWorkshops';
import AlumniNetworks from './Pages/AlumniNetworks';
import Registration from './Pages/Registration';
import CodingPracticePage from './Pages/CodingPracticePage';
import ResumeBuildingPage from './Pages/ResumeBuildingPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home as default route */}
          <Route path="about" element={<About />} />
          <Route path="job-internships" element={<JobAndInternships />} />
          <Route path="placement-preparation" element={<PlacementPreparation />} />
          <Route path="placement-analytics" element={<PlacementAnalytics />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events-workshop" element={<EventsWorkshops />}>
            <Route path="registration" element={<Registration />} />
          </Route>
          <Route path="alumni-networks" element={<AlumniNetworks />} />
          <Route path="coding-practice" element={<CodingPracticePage />} />
          <Route path="resume-building" element={<ResumeBuildingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
