

import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import '../css/Admin.css';



import Agencydashboardhome from '../sectionagency/Agencydashboardhome';
import Header from '../sectionagency/Header';
import Sidebar from '../sectionagency/Sidebar';
import TestAgencypage from '../sectionagency/TestAgencypage';
import AgencyChangepassword from '../sectionagency/AgencyChangepassword';
import Agencyprofile from '../sectionagency/Agencyprofile';
import Lab from '../sectionagency/Lab';
import Error404 from '../404';

function DashboardLayoutAgency() {
  const [asideOpen, setAsideOpen] = useState(true);
  const sidebarRef = useRef(null); // Ref for the sidebar

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };

  const closeSidebar = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
      setAsideOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust max-width as per your tablet screen size

    const handleMediaQueryChange = (mq) => {
      if (mq.matches) {
        setAsideOpen(false);
      } else {
        setAsideOpen(true);
      }
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="admin-container">
      <header className="header">
        <Header toggleAside={toggleAside} />
      </header>
      <div className="flex">

        {asideOpen && <Sidebar ref={sidebarRef} closeSidebar={closeSidebar} />}
      </div>
      <main className="main-content">
        
        <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Agencydashboardhome />} />
        <Route path="/testagencypage" element={<TestAgencypage />} />
        <Route path="/agencyprofile" element={<Agencyprofile />} />
        <Route path="/agencychangepassword" element={<AgencyChangepassword />} />
        <Route path="/agencylab" element={< Lab/>} />
        </Routes>
      </main>
    </div>
  );
}

export default DashboardLayoutAgency;


