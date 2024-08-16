import { userLogin } from "../redux/services/AuthService";
import { Link } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from '../images/logo.png'
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [islogin, setIslogin] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosedropdown = () => {
    setAnchorEl(null);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <nav className=" headermaindiv  ">
        <div className="flex flex-wrap items-center justify-between p-2 mx-12">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="h-6 w-auto mr-10"
                src={logo}
                alt="Your Company"
              />
            </Link>
            <ul className=" md:flex flex-row items-center space-x-4 font-medium  ">
              <li>
              <Link to="/appoinments">
                  My Appointements
                  </Link>
              </li>
            </ul>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-hamburger"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-multi-level"
          >
            <ul className="flex flex-col items-center font-normal p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0">
              {islogin ? (
                <li>
                  <div>
                    <IconButton
                      onClick={handleClick}
                      aria-label="profile"
                      size="large"
                      sx={{ padding: "0px" }}
                    >
                      <Avatar sx={{ width: 40, height: 40 }}>
                        {" "}
                        {/* Adjust size as needed */}
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
                        <AccountCircleIcon
                          fontSize="small"
                          sx={{ marginRight: "8px" }}
                        />
                        My Profile
                      </MenuItem>
                      <MenuItem onClick={handleClosedropdown}>
                        <LogoutIcon
                          fontSize="small"
                          sx={{ marginRight: "8px" }}
                        />
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </li>
              ) : (
                <li>
                  <button className="login-button" onClick={handleOpen}>
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <Formik
  initialValues={{ username: "", password: "" }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ isSubmitting, errors, touched }) => ( // Destructure errors and touched here
    <Form>
      <section className="modalsectiondivlabs flex items-center justify-center h-screen">
        <div className="w-50 flex flex-col gap-1 rounded-lg p-1">
        <div className="loginimage-container">
                <img
                  className="responsive-logo"
                  src={logo}
                  alt="Your Company"
                />
                </div>
          <h1 className="text-center leading-normal text-color-skyblue font-medium text-3xl mb-6">
            Login Lab Account
          </h1>
          <Field
            type="text"
            name="username"
            as={TextField}
            label="Username"
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(errors.username && touched.username)}
            helperText={touched.username ? errors.username : ""}
          />
          <Field
            type="password"
            name="password"
            as={TextField}
            label="Password"
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(errors.password && touched.password)}
            helperText={touched.password ? errors.password : ""}
          />
          <button
            type="submit"
            disabled={isSubmitting}
             className="buttoncolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
          >
            {isSubmitting ? "Login" : "Login"}
          </button>
        </div>
      </section>
    </Form>
  )}
</Formik>

        </Dialog>
      </nav>
    </>
  );
};

export default Header;
