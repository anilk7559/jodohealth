import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import { ListItemIcon } from '@mui/material';

const Sidebar = forwardRef(({ closeSidebar }, ref) => {
  const sidebarStyle = {
    backgroundColor: 'rgb(13 121 173)',
    color: 'white',
    padding: '10px',
    width: '150px',
    minHeight: "600px",
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
  };


  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8%'
  };

  return (
    <aside style={sidebarStyle}  ref={ref}>
      <nav className="sidebar-nav">
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={linkStyle}>
            <ListItemIcon sx={{ minWidth: '0px' }}>
              <HomeIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <Link to="/admindashboard" style={linkStyle} onClick={closeSidebar}>
              Home
            </Link>
          </li>
          <li style={linkStyle}>
            <ListItemIcon sx={{ minWidth: '0px' }}>
              <FamilyRestroomIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <Link to="/admindashboard/parentlab" style={linkStyle} onClick={closeSidebar}>
              Parent Lab
            </Link>
          </li>
          <li style={linkStyle}>
            <ListItemIcon sx={{ minWidth: '0px' }}>
              <EscalatorWarningIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <Link to="/admindashboard/adminlab" style={linkStyle} onClick={closeSidebar}>
              Laboratory
            </Link>
          </li>
          <li style={linkStyle}>
            <ListItemIcon sx={{ minWidth: '0px' }}>
              <EscalatorWarningIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <Link to="/admindashboard/changecontent" style={linkStyle} onClick={closeSidebar}>
              Alteration
            </Link>
          </li>
          <li style={linkStyle}>
            <ListItemIcon sx={{ minWidth: '0px' }}>
              <EscalatorWarningIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <Link to="/admindashboard/allbookinglist" style={linkStyle} onClick={closeSidebar}>
              Bookings
            </Link>
          </li>
          <li style={linkStyle}>
            <ListItemIcon sx={{ minWidth: '0px' }}>
              <EscalatorWarningIcon style={{ color: 'white' }} />
            </ListItemIcon>
            <Link to="/admindashboard/subscription" style={linkStyle} onClick={closeSidebar}>
              Subscription
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
})

export default Sidebar;
