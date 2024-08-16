

import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import { FaBars } from 'react-icons/fa';
import looka from '../images/looka.png';
import { getAccountDetails } from "../redux/services/AuthService";
import { storageKey } from "../constants/storage";

const Header = ({  toggleAside }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountInfo, setAccountInfo] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosedropdown = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    GetAccountDetails();
  }, []);

  const GetAccountDetails = async () => {
    const res = await getAccountDetails();
    if (res.success) {
      setAccountInfo(res.response.body);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(storageKey.AUTH_TOKEN);
    localStorage.removeItem(storageKey.USER_DATA);
    navigate("/lab");
  };

  return (
    <nav className="headermaindivadmin">
      <div className="flex items-center justify-between p-2 ml-4">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="h-10 w-auto mr-10"
              src={looka}
              alt="Your Company"
            />
          </Link>
        </div>
        <ul className="flex items-center font-normal p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
          <li className="flex items-center">
            <Typography style={{ color: "white", paddingTop: "10px" }}>
              {accountInfo.name}
            </Typography>
            <div>
              <IconButton
                onClick={handleClick}
                aria-label="profile"
                size="large"
                sx={{ padding: "0px" }}
              >
                <Avatar sx={{ width: 40, height: 40, background: "rgb(13 121 173)" }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClosedropdown}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClosedropdown}>
                  <AccountCircleIcon fontSize="small" sx={{ marginRight: "8px" }} />
                  <Link to="/labdashboard/labprofile">
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClosedropdown}>
                  <LockOpenIcon fontSize="small" sx={{ marginRight: "8px" }} />
                  <Link to="/labdashboard/labchangepassword">
                    Change Password
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" sx={{ marginRight: "8px" }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
            <button type="button" className="text-3xl md:hidden" onClick={toggleAside}>
              <FaBars style={{ color: 'white' }} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;






