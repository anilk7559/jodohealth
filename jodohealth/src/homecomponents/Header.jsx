import React, { useEffect } from "react";
import { userRigistered, userRigisteredotp } from "../redux/services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../firebase.config";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import Dialog from "@mui/material/Dialog";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { signInWithPhoneNumber } from "firebase/auth";
import { toast } from 'react-toastify';
import { getData, storageKey } from "../constants/storage";
import "./homecomponents.css";
import logo from '../images/logo.png'
import looka from '../images/looka.png'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SubscriptionCard from "./SubscriptionCard";
const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [islogin, setIslogin] = useState(false);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [user, setUser] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const data = getData(storageKey.USER_LOGIN);
    if (data == "User") {
      setIslogin(true);
    }
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);




  const onSignup = async () => {

    const body = {
      phone: ph,
    };
    const res = await userRigistered(body)
    if (res.success == true) {
      toast.success("OTP resent successfully!");
      setOtp(res.response?.body?.otp)
      setLoading(false);
      setShowOTP(true);
      startTimer();
    }


  }


  const onOTPVerify = async () => {
    setLoading(true);
    const body = {
      phone: ph,
      otp: otp,
    };

    try {
      const responseapi = await userRigisteredotp(body);

      if (responseapi.success === true) {
        toast.success("Verification successful!");
        setOpen(false);
        setIslogin(true);
        const subscription = getData(storageKey.SUBSCRIPTION);
        if (subscription === "1") {
          navigate("/user/subscription");
        } else if (subscription === "0") {
          navigate("/user/members");
        } else {
        }
        console.log(responseapi);
      } else {
        toast.error("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    setTimer(60);
    setTimerRunning(true);
  };

  const resendOTP = () => {
    setOtp("");
    setTimerRunning(false);
    setLoading(true);
    signInWithPhoneNumber(auth, "+" + ph, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        startTimer();
        toast.success("OTP resent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleBackToPhoneInput = () => {
    setShowOTP(false);
    setOtp("");
    setTimerRunning(false);
  };
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

  const handleLogout = () => {
    // Clear authentication token from storage
    localStorage.removeItem(storageKey.AUTH_TOKEN);
    localStorage.removeItem(storageKey.USER_DATA);
    localStorage.removeItem(storageKey.USER_LOGIN);
    localStorage.removeItem(storageKey.USER_PHONE);
    localStorage.removeItem(storageKey.SUBSCRIPTION);
    // Update islogin state to false
    setIslogin(false);
    navigate("/")

    // Additional cleanup or state resets if needed
  };
  const handleLinkClick = () => {
    const data = getData(storageKey.USER_LOGIN);
    const Subscription = getData(storageKey.SUBSCRIPTION);
    if (data === "User" && Subscription === "0") {
      navigate("/user/userlablisting");
    } else {
      if (data !== "User") {
        toast.error("Please login first");
      }
      if (Subscription === "1") {
        toast.error("Please Subscribe first");
        navigate("/user/subscription");
      }
    }
    // if(Subscription === "0"){
    //   navigate("/user/userlablisting");
    // }
  };

  const handlemyprofileclick = () => {
    const data = getData(storageKey.USER_LOGIN);
    if (data === "User") {
      navigate("/user/profile")
    } else {
      toast.error("Please login first");
    }
  }
  const handlebookingupdate = () => {
    const data = getData(storageKey.USER_LOGIN);
    if (data === "User") {
      navigate("/user/booking")
    } else {
      toast.error("Please login first");
    }
  }
  const handlemembersclick = () => {
    const data = getData(storageKey.USER_LOGIN);
    if (data === "User") {
      navigate("/user/members")
    } else {
      toast.error("Please login first");
    }
  }
  const subscriptionEndDate = '2024-12-31';
  const styles = {
    button: {
      position: 'absolute',
      right: '0px', // Adjust as needed
      padding: '2px 4px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: 'red',
      color: '#fff',
      border: 'none',
      borderRadius: '0px 0px 0px 5px',
      zIndex: 1000,
      top: "56px"
    },
  };
  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <>

      <div id="recaptcha-container"></div>

      <nav className=" headermaindiv  ">
        <div className="flex flex-wrap items-center justify-between hederinsidediv">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="h-14 w-auto mr-10"
                src={looka}
                alt="Your Company"
              />
            </Link>

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
              color="white"
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
            className={`${isOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
            id="navbar-multi-level"
          >

            <ul className="flex flex-col items-center font-normal p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <ul className="md:flex flex-row items-center space-x-2 font-medium">
                <li className="headermenus">
                  <a href="https://wa.me/8894483210" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    <span className="contact-number">8894483210</span>
                  </a>
                </li>
                {islogin ? (
                  <li className="headermenus">
                    <button onClick={handleLinkClick}>
                      Book Appointment
                    </button>
                  </li>
                ) : (
                  <div></div>
                )}

              </ul>
              <li className="dropdown">
                <ul className="login-button-dropdown  md:flex flex-row items-center space-x-4 font-medium  pr-4 ">Services</ul>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/user/labcontentpage">Lab Test</Link>
                  </li>
                  <li>
                    <Link to="/user/consultation">Consultations</Link>
                  </li>
                  <li>
                    <Link to="/user/claimassistance">Claim assistance</Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <ul className="login-button-dropdown  md:flex flex-row items-center space-x-4 font-medium  pr-4 ">Explore More:</ul>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contactus">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Pricing policy</Link>
                  </li>
                </ul>
              </li>

              {islogin ? (

                <div></div>
              ) : (
                <li className="dropdown">
                  <ul className="login-button-dropdown  md:flex flex-row items-center space-x-4 font-medium  pr-4 ">For clients</ul>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/admin">Administration</Link>
                    </li>
                    <li>
                      <Link to="/agency">Agency</Link>
                    </li>
                    <li>
                      <Link to="/lab">Laboratory</Link>
                    </li>
                  </ul>
                </li>
              )}
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
                      <MenuItem onClick={handlemyprofileclick}>
                        <AccountCircleIcon
                          fontSize="small"
                          sx={{ marginRight: "8px" }}
                        />
                        My Profile
                      </MenuItem>
                      <MenuItem onClick={handlebookingupdate}>
                        <AccountCircleIcon
                          fontSize="small"
                          sx={{ marginRight: "8px" }}
                        />
                        Booking Update
                      </MenuItem>
                      <MenuItem onClick={handlemembersclick}>
                        <AccountCircleIcon
                          fontSize="small"
                          sx={{ marginRight: "8px" }}
                        />
                        Members
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
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
                <div className="flex">


                  <li>
                    <button className="login-button" onClick={handleOpen}>
                      Login / Sign Up
                    </button>
                  </li>
                </div>
              )}
            </ul>

            {islogin ? (
              <div style={styles.container}>
                <button onClick={toggleCardVisibility} style={styles.button}>
                  {isCardVisible ? 'Subscription' : 'Subscription'}
                </button>
                {isCardVisible && <SubscriptionCard subscriptionEndDate={subscriptionEndDate} />}
              </div>

            ) : (
              <div></div>
            )}

          </div>

        </div>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
          <div id="recaptcha-container"></div>
          <section className="modalsectiondiv flex items-center justify-center h-screen">
            <div>
              <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                <div className="loginimage-container">
                  <img
                    className="responsive-logo"
                    src={logo}
                    alt="Your Company"
                  />
                </div>

                <h1 className="text-center leading-normal text-color-skyblue font-medium text-3xl mb-6">
                  Login / Sign Up
                </h1>
                {showOTP ? (
                  <>
                    <div className="buttoncolorcall text-emerald-500 w-fit mx-auto p-4 rounded-full">
                      <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                      htmlFor="otp"
                      className="font-bold text-xl text-color-skyblue text-center"
                    >
                      Enter your OTP
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={4}
                      otpType="number"
                      disabled={false}
                      autoFocus
                      className="opt-container"
                    ></OtpInput>
                    <button
                      className="text-color-skyblue"
                      onClick={handleBackToPhoneInput}
                    >
                      Edit number
                    </button>
                    <button
                      onClick={onOTPVerify}
                      className="buttoncolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Verify OTP</span>
                    </button>
                    <div>
                      {timer > 0 ? (
                        <p className="text-sm text-gray-500">
                          Resend code in {timer} seconds
                        </p>
                      ) : (
                        <button
                          onClick={resendOTP}
                          className="buttoncolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                          disabled={loading}
                        >
                          {loading && (
                            <CgSpinner
                              size={20}
                              className="mt-1 animate-spin"
                            />
                          )}
                          <span>Resend code</span>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="buttoncolorcall text-emerald-500 w-fit mx-auto p-4 rounded-full">
                      <BsTelephoneFill size={30} />
                    </div>
                    <label
                      htmlFor=""
                      className="font-bold text-xl text-color-skyblue text-center"
                    >
                      Verify your phone number
                    </label>
                    <PhoneInput
                      country={"in"}
                      value={ph}
                      onChange={setPh}
                      placeholder="Enter phone number"
                    />
                    <button
                      onClick={onSignup}
                      className="buttoncolor w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      disabled={loading}
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Send code via SMS</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </Dialog>
      </nav>
    </>
  );
};

export default Header;
