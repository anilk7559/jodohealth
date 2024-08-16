
import Testpage from '../sectionadmin/Testpage';

import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../sectionadmin/Header';
import '../css/Admin.css'; // You can define your responsive classes here
import Sidebar from '../sectionadmin/Sidebar';

import Admindashboardhome from '../sectionadmin/Admindashboardhome';
import Agency from '../sectionadmin/Agency';
import Lab from '../sectionadmin/Lab';
import AdminProfile from '../sectionadmin/Adminprofile';
import Changepassword from '../sectionadmin/Changepassword';
import Changecontent from '../sectionlab/Changecontent';
import Error404 from '../404';
import Alllabsbookinglist from '../sectionadmin/Alllabsbookinglist';
import Subscription from '../sectionadmin/Subscription';

function DashboardLayoutAdmin() {
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
        <Route path="/" element={<Admindashboardhome />} />
        <Route path="/testpage" element={<Testpage />} />
        <Route path="/parentlab" element={<Agency />} />
        <Route path="/changecontent" element={<Changecontent />} />
        <Route path="/adminlab" element={<Lab />} />
        <Route path="/adminprofile" element={<AdminProfile />} />
        <Route path="/changepassword" element={<Changepassword />} />
        <Route path="/allbookinglist" element={<Alllabsbookinglist />} />
        <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </main>
    </div>
  );
}

export default DashboardLayoutAdmin;

// import Testpage from '../sectionadmin/Testpage';
// import React, { useEffect, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Header from '../sectionadmin/Header';
// import '../css/Admin.css'; // You can define your responsive classes here
// import Sidebar from '../sectionadmin/Sidebar';

// import Admindashboardhome from '../sectionadmin/Admindashboardhome';
// import Agency from '../sectionadmin/Agency';
// import Lab from '../sectionadmin/Lab';
// import AdminProfile from '../sectionadmin/Adminprofile';
// import Changepassword from '../sectionadmin/Changepassword';
// import Changecontent from '../sectionlab/Changecontent';
// import Error404 from '../404';

// function DashboardLayoutAdmin() {
//   const [asideOpen, setAsideOpen] = useState(true);

//   const toggleAside = () => {
//     setAsideOpen(!asideOpen);
//   };

//   const closeSidebar = () => {
//     if (asideOpen) {
//       setAsideOpen(false);
//     }
//   };

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust max-width as per your tablet screen size

//     const handleMediaQueryChange = (mq) => {
//       if (mq.matches) {
//         setAsideOpen(false);
//       } else {
//         setAsideOpen(true);
//       }
//     };

//     handleMediaQueryChange(mediaQuery);
//     mediaQuery.addListener(handleMediaQueryChange);
//     return () => {
//       mediaQuery.removeListener(handleMediaQueryChange);
//     };
//   }, []);

//   return (
//     <div className="admin-container">
//       <header className="header">
//         <Header toggleAside={toggleAside} />
//       </header>
//       <div className="flex">
//         {asideOpen && <Sidebar />}
//       </div>
//       <main className="main-content"  onClick={closeSidebar}>
//         <Routes>
//           <Route path="*" element={<Error404 />} />
//           <Route path="/" element={<Admindashboardhome />} />
//           <Route path="/testpage" element={<Testpage />} />
//           <Route path="/parentlab" element={<Agency />} />
//           <Route path="/changecontent" element={<Changecontent />} />
//           <Route path="/adminlab" element={<Lab />} />
//           <Route path="/adminprofile" element={<AdminProfile />} />
//           <Route path="/changepassword" element={<Changepassword />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default DashboardLayoutAdmin;



