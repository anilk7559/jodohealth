import React, { useEffect, useState } from 'react';
import CloseIcon from "@mui/icons-material/Close"
import { Button, Typography } from '@mui/material';
import { Getlablist } from '../redux/services/otherServices/Lab';
import banner from "../images/banner.png"
import { getData, storageKey, storeData } from '../constants/storage';
import { toast } from 'react-toastify';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import fistimg from "../images/Apollo-Clinic-Logo 4.png"
import secondimg from "../images/MP 1.png"
import thirdimg from "../images/finall-logo.39c1a2e7 3.png"
import fourthimg from "../images/Thyrocare-logo-png.png"
import { useNavigate } from 'react-router-dom';
import { makeSubscription } from '../redux/services/otherServices/Users';
import axios from 'axios';
import premiumbenefits from "../images/premiumbenefits.png"
function LabTest() {
  const navigate = useNavigate();

  const [labsdata, setLabsdata] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showNearbyLabs, setShowNearbyLabs] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openusermember, setOpenusermember] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [staticlabdata, setstaticlabdata] = useState([])
  const [isOpentermandcondition, setIsOpentermandcondition] = useState(false);
  const [phonenumber, setPhonenumber] = useState("")
  const [colorIndex, setColorIndex] = useState(0);
  useEffect(() => {
    const colors = [ 'rgb(13 121 173)', '#32CD32'];
    const interval = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const colors = [ 'rgb(13 121 173)', '#32CD32'];

  const handleOpen = () => {
    const data = getData(storageKey.USER_LOGIN);
    const subscription = getData(storageKey.SUBSCRIPTION);

    if (data === "User") {
      if (subscription === "1") {
        toast.error("Subscribe first");
        setOpen(true);
      } else if (subscription === "0") {
        navigate("/user/userlablisting");
      } else {
        toast.error("Invalid subscription value");
      }
    } else {
      toast.error("Please login first");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };
  useEffect(() => {

    handleGetLabData();
  }, []);


  const handleGetLabData = async () => {
    const res = await Getlablist();
    console.log(res.response?.body?.findLab, "i am  labs data from ashwin");

    if (res.success === true) {
      setLabsdata(res.response?.body?.findLab);
    }

    setstaticlabdata([
      {
        id: "1",
        image: fistimg,
      },
      {
        id: "2",
        image: fourthimg,
      },
      {
        id: "3",
        image: thirdimg,
      },
      {
        id: "4",
        image: secondimg,
      },
    ]);
  };
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const findNearbyLabs = (userLat, userLong) => {
    const nearbyLabs = labsdata.filter((lab) => {
      const distance = calculateDistance(userLat, userLong, lab.latitude, lab.longitude);
      return distance <= 1000;
    });
    setSearchResults(nearbyLabs);
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);

          if (showNearbyLabs) {
            findNearbyLabs(latitude, longitude);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  useEffect(() => {
    handleNearbyLabsButtonClick();
  }, [])

  const handleNearbyLabsButtonClick = () => {
    if (!showNearbyLabs) {
      setShowNearbyLabs(true);

      getCurrentLocation();
    } else {
      setShowNearbyLabs(false);
      setSearchResults([]);

    }
  };

  const filterLabs = (query) => {
    return labsdata.filter(
      (lab) =>
        lab.name.toLowerCase().includes(query.toLowerCase()) ||
        lab.city.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.trim() === '') {

      getCurrentLocation();
    } else {
      setSearchResults(filterLabs(value));
      setShowNearbyLabs(false);

    }
  };

  const renderLabCards = () => {
    return searchResults.map((lab) => (
      <div key={lab._id} className="flex justify-center">
        <div className="w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900">
                  {lab.name}
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-700 font-semibold">
              {lab.fullAddress}, {lab.city}, {lab.state}, {lab.pincode}
            </p>
          </div>
          <div className="mt-auto">
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white buttoncolor rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:buttoncolor dark:focus:ring-blue-800"
              onClick={handleOpen}
            >
              Book Now
              <svg
                className="w-3.5 h-3.5 ml-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (showNearbyLabs && latitude && longitude) {
      findNearbyLabs(latitude, longitude);
    }
  }, [showNearbyLabs, latitude, longitude]);


  const memberFormik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      age: '',
      address: '', // Optional field
      gender: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      age: Yup.number()
        .typeError('Age must be a number')
        .positive('Age must be a positive number')
        .integer('Age must be an integer')
        .required('Required'),
      gender: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values) => {
      if (selectedUserIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[selectedUserIndex] = { ...values };
        setUsers(updatedUsers);
        setSelectedUserIndex(null);
      } else {
        if (users.length < 4) {
          setUsers([...users, values]);
        } else {
          alert('You can only add up to 4 members.');
        }
      }
      memberFormik.resetForm();
    },
  });


  const handleOpenusermember = () => {
    const userdata = getData(storageKey.USER_PHONE);
    setPhonenumber(userdata);
    setOpen(false)
    setIsOpentermandcondition(true)

  };

  const handleCloseusermember = () => {
    setOpenusermember(false);
  };


  const handlePayment = async () => {
    if (users.length === 0) {
        toast.error("Please add at least one member before subscribing.");
        return;
    }
    try {
        const orderResponse = await axios.post('https://razorepay.onrender.com/order', {
            amount: 999, 
            currency: 'INR'
        });

        const { id} = orderResponse.data.orderLink;
        console.log(orderResponse, "order response");
        const options = {
            key: 'rzp_test_wGm93ljkuSPi5M',
            amount: 999, 
            currency: "INR",
            name: 'Jodo Health',
            description: 'Subscription Payment',
            order_id: id, 
            handler: async function (response) {
                console.log('Payment Response:', response);
                if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
                    toast.error("Incomplete payment response. Please try again.");
                    return;
                }

                const verifyBody = {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                try {
                    const verifyResponse = await axios.post('https://razorepay.onrender.com/verify', verifyBody);
                    if (verifyResponse.status === 200) {
                     toast.success("payment successfully ")
                      const body = {
                        membersData: users
                      };
                  
                        const res = await makeSubscription(body);
                        if (res.success === true) {
                            console.log(res, "i am response");
                            toast.success("Success! You're now subscribed.");
                            navigate("/user/members");
                            storeData(storageKey.SUBSCRIPTION, "0");
                        } else {
                            toast.error("Subscription failed. Please try again.");
                        }
                    } else {
                        toast.error("Payment verification failed. Please try again.");
                    }
                } catch (error) {
                    console.error('Error while verifying payment:', error);
                    toast.error("Error while verifying payment. Please try again.");
                }
            },
            prefill: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                contact: phonenumber
            },
            theme: {
                color: '#F37254'
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error('Error while creating order:', error);
        toast.error("Error while creating order. Please try again.");
    }
};


  const handleEditUser = (index) => {
    memberFormik.setValues(users[index]);
    setSelectedUserIndex(index);
  };

  const handleClearUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1); // Remove user at the specified index
    setUsers(updatedUsers);
  };


  const handleAgree = () => {
    setIsOpentermandcondition(false)
    console.log('User agreed to the terms and conditions');
    setOpenusermember(true);
  };


  return (
    <div>

      <div className="locationsection-main-div space-x-4">

        <div className="py-2">
          <label
            htmlFor="search"
            className="text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="search"
              className="block w-full py-2 px-4 text-sm text-gray-900 border border-gray-300 bg-white placeholder-gray-400 rounded-md"
              placeholder="Search by name or city"
              value={searchQuery}
              onChange={handleSearchChange}
              required
              style={{ height: 'auto', border: '1px solid #66ceff', borderRadius: '4px' }}
            />

          </div>
        </div>
        <div className="py-1">
          <div className="flex items-center py-2 ">
            <ArrowRightAltIcon sx={{ color: 'gray', mr: 1 }} />
          </div>
        </div>
        <div className="py-1">
          <button className="blinking-button"
            style={{ backgroundColor: colors[colorIndex] , borderRadius:"7px" }} onClick={handleNearbyLabsButtonClick}>
            Search Labs Nearby Me
          </button>

        </div>


      </div>

      {searchResults.length === 0 && (
        <section className="flex justify-center m-4">
          <img
            src={banner}
            alt="Full width image"
            className="w-full"

          />
        </section>
      )}


      {searchResults.length === 0 && (
        <div className="flex flex-col md:flex-row px-4 md:px-12 mt-6">
          <div className="flex-1 mb-8 md:mb-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-8">
              {staticlabdata.slice(0, 4).map((lab) => (
                <div key={lab.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img src={lab.image} alt="labimage" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white buttoncolor rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:buttoncolor dark:focus:ring-blue-800"
                      onClick={handleOpen}
                    >
                      Book Now
                      <svg
                        className="w-3.5 h-3.5 ml-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 ml-1">
            <div className="w-full md:w-3/3 mx-auto">
              <div className="benefit-card">
                <div className="benefit-subcard-card">
                  <div className="benefit-plan">
                    <div>
                      <div className="logo-container">
                        <img src={premiumbenefits} width="133" height="33" className="logo" alt="logo" />
                      </div>
                      <div className="first-heading-card">Simplify Your Lab Appointments with Our Premier Labs</div>
                    </div>
                    <div className="member-heading">
                      <div>Unlock Exclusive Membership Benefits:</div>
                      <div className='textcontainer'>
                        <div className="membership-container">
                          <div className="membership-sub">
                            <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                          </div>
                          <div className="plan-heading">Fast-Track Scheduling</div>
                        </div>
                        <div className="membership-container">
                          <div className="membership-sub">
                            <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                          </div>
                          <div className="plan-heading">Specialised Discounts on Diagnostic Tests</div>
                        </div>
                        <div className="membership-container">
                          <div className="membership-sub">
                            <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                          </div>
                          <div className="plan-heading">Dedicated Customer Support</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="choose-plan-section" className="plan-container">
                    <div className="choose-plan-heading">Plan That Suits You Best</div>
                    <div className="planlogo-container">
                      <div
                        className={`price-container ${selectedPlan === '1year' ? 'selected' : ''}`}
                        onClick={() => handlePlanSelect('1year')}
                      >
                        <div className="price-detail">
                          <div className="price-sub-detail">
                            <span className="price-heading">1 Year Membership</span>
                          </div>
                          <div className="plan-price">₹999</div>
                          <div className="monthly-price">
                            <span>₹83/month</span>
                            <span className="monthly-save">Save 16%</span>
                          </div>
                        </div>
                      </div>
                      <div className="btn-container">
                        <a onClick={handleOpen} target="_self" rel="noopener">
                          <div className="btn-heading" style={{backgroundColor: colors[colorIndex] ,}}>
                            <span>Join Now</span>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="non-refundable-note">
                      Please note: This subscription is non-refundable.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {showNearbyLabs && renderLabCards()}
        {!showNearbyLabs && searchResults.length > 0 && renderLabCards()}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" >
          <Box >
            <Box sx={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
              <Button onClick={handleClose} color="inherit" size="small">
                <CloseIcon className='text-color-skyblue' />
              </Button>
            </Box>
            <DialogContent >
              <div className="benefit-card">
                <div className="benefit-subcard">
                  <div className="benefit-plan">
                    <div>
                      <div className="logo-container">
                        <div>
                          <img src={premiumbenefits} width="133" height="33" className="logo" alt="logo" />
                        </div>
                      </div>
                      <div className="first-heading">Simplify Your Lab Appointments with Our Premier Labs</div>

                    </div>
                    <div className="member-heading">
                      <div>Unlock Exclusive Membership Benefits:</div>
                      <div>
                        <div className="membership-container">
                          <div className="membership-sub">
                            <div className=''>
                              <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                            </div>
                          </div>
                          <div className="plan-heading">Fast-Track Scheduling</div>
                        </div>
                        <div className="membership-container">
                          <div className="membership-sub">
                            <div>
                              <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                            </div>
                          </div>
                          <div className="plan-heading">
                          Specialised Discounts on Diagnostic Tests</div>
                        </div>
                        <div className="membership-container">
                          <div className="membership-sub">
                            <div>
                              <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                            </div>
                          </div>
                          <div className="plan-heading">Dedicated Customer Support</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="choose-plan-section" className="plan-container">
                    <div className="choose-plan">Plan That Suits You Best</div>
                    <div className="planlogo-container">

                      <div
                        className={`price-container ${selectedPlan === '6months' ? 'selected' : ''}`}
                        onClick={() => handlePlanSelect('6months')}
                      >
                        <div className="price-detail">
                          <div className="price-sub-detail">
                            <div>
                              <span className="price-heading">
                                <span>1 Year Membership</span>
                              </span>
                            </div>
                          </div>
                          <div className="plan-price">₹999</div>
                          <div className="monthly-price">
                            <span>₹83/month</span>
                            <span className="monthly-save">Save 16%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="btn-container">
                          <a onClick={handleOpenusermember} target="_self" rel="noopener">
                            <div className="btn-heading">
                              <span>Join now</span>
                            </div>
                          </a>
                        </div>
                        <div className="non-refundable-note">
                      Please note: This subscription is non-refundable.
                    </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Box>
        </Dialog>
      </div>
      <Dialog open={openusermember} onClose={handleCloseusermember} fullWidth maxWidth="lg">
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleCloseusermember} color="inherit" size="small">
              <CloseIcon className="text-color-skyblue" />
            </IconButton>
          </Box>
          <DialogContent sx={{ padding: 0 }}>
            <div className="benefit-card">
              <div className="benefit-subcard flex flex-col">
                <div>
                  <div className="sub-user-heading p-3 m-2" style={{ background: "#f3f3f3" }}>
                    <strong>Add up to 4 members only</strong> <strong style={{ color: "red", marginLeft: "5%" }}>Note:</strong> please add information carefully as it will not be editable in the future
                  </div>
                  <div className="left-section">
                    <div className="user-detail-container">
                      <div className="custom-detail">
                        <div className="detail-heading">
                          <div className="main-user-heading">Member Details</div>
                        </div>
                        <div className="input-container">
                          <form className="user-form" onSubmit={memberFormik.handleSubmit}>
                            <div className='flex flex-col w-full gap-[10px]'>
                              <div className="input-detail-container">
                                <div className="input-detail">
                                  <label htmlFor="name" className="input-detail-label">Full Name*</label>
                                  <input
                                    name="name"
                                    type="text"
                                    className="custom-input"
                                    value={memberFormik.values.name}
                                    onChange={memberFormik.handleChange}
                                    onBlur={memberFormik.handleBlur}
                                  />
                                  {memberFormik.touched.name && memberFormik.errors.name ? (
                                    <div className="error">{memberFormik.errors.name}</div>
                                  ) : null}
                                </div>
                                <div className="input-detail">
                                  <label htmlFor="phone" className="input-detail-label">Phone*</label>
                                  <input
                                    name="phone"
                                    type="text"
                                    className="custom-input"
                                    value={memberFormik.values.phone}
                                    onChange={memberFormik.handleChange}
                                    onBlur={memberFormik.handleBlur}
                                  />
                                  {memberFormik.touched.phone && memberFormik.errors.phone ? (
                                    <div className="error">{memberFormik.errors.phone}</div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="input-detail-container">
                                <div className="input-detail">
                                  <label htmlFor="email" className="input-detail-label">Email*</label>
                                  <input
                                    name="email"
                                    type="text"
                                    className="custom-input"
                                    value={memberFormik.values.email}
                                    onChange={memberFormik.handleChange}
                                    onBlur={memberFormik.handleBlur}
                                  />
                                  {memberFormik.touched.email && memberFormik.errors.email ? (
                                    <div className="error">{memberFormik.errors.email}</div>
                                  ) : null}
                                </div>
                                <div className="input-detail">
                                  <label htmlFor="age" className="input-detail-label">Age*</label>
                                  <input
                                    name="age"
                                    type="text"
                                    className="custom-input"
                                    value={memberFormik.values.age}
                                    onChange={memberFormik.handleChange}
                                    onBlur={memberFormik.handleBlur}
                                  />
                                  {memberFormik.touched.age && memberFormik.errors.age ? (
                                    <div className="error">{memberFormik.errors.age}</div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="input-detail-container">
                                <div className="input-detail">
                                  <label htmlFor="address" className="input-detail-label">Address</label>
                                  <input
                                    name="address"
                                    type="text"
                                    className="custom-input"
                                    value={memberFormik.values.address}
                                    onChange={memberFormik.handleChange}
                                    onBlur={memberFormik.handleBlur}
                                  />
                                  {memberFormik.touched.address && memberFormik.errors.address ? (
                                    <div className="error">{memberFormik.errors.address}</div>
                                  ) : null}
                                </div>
                                <div className="input-detail">
                                  <label htmlFor="gender" className="input-detail-label">Gender*</label>
                                  <select
                                    name="gender"
                                    className="custom-input"
                                    value={memberFormik.values.gender}
                                    onChange={memberFormik.handleChange}
                                    onBlur={memberFormik.handleBlur}
                                  >
                                    <option value="" label="Select" />
                                    <option value="male" label="Male" />
                                    <option value="female" label="Female" />
                                    <option value="other" label="Other" />
                                  </select>
                                  {memberFormik.touched.gender && memberFormik.errors.gender ? (
                                    <div className="error">{memberFormik.errors.gender}</div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="button-container">
                                <button type="submit" className="button-header">ADD MEMBER</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="add-user-container">
                  <div className="add-user">
                    <div className="main-user-heading">View/Edit Members Here!</div>
                    <div className="flex add-user justify-between">
                      <div className="show-user-container">
                        {/* Display added members */}
                        {users.map((user, index) => (
                          <div className="show-user" key={index} onClick={() => handleEditUser(index)}>
                            <Typography variant="body1">{user.name}</Typography>
                            <button onClick={() => handleClearUser(index)} className="remove-button">Remove</button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="button-container">
                      <button type="button" onClick={handlePayment} className="button-header">SUBSCRIBE NOW</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Box>
      </Dialog>

      {/* term&conditionmodal */}
      {isOpentermandcondition && (
        <div
          id="static-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
          onClick={() => setIsOpentermandcondition(false)}
        >
          <div
            className="relative p-6 w-full max-w-3xl bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >

            <div className="terms-container">
              <Typography variant="h3" gutterBottom className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" style={{ textAlign: "center", color: "rgb(13 121 173)" }}>
                Terms and Conditions
              </Typography>
              <Typography variant="body1" paragraph className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                Welcome to JodoHealth! These terms and conditions outline the rules and regulations for the use of our website, accessible at www.jodohealth.com. By accessing this website, we assume you accept these terms and conditions. Do not continue to use JodoHealth if you do not agree to take all of the terms and conditions stated on this page.
              </Typography>

              {/* Add more sections of terms and conditions as needed */}

              <Typography variant="body1" paragraph className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                If you have any questions about these terms, please contact us at <a href="mailto:Support@jodohealth.com" style={{ color: "rgb(13 121 173)" }}>Support@jodohealth.com</a>. Our team is dedicated to addressing any concerns you may have regarding our terms and conditions.
              </Typography>

            </div>
            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-customcolor hover:bg-customcolor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-base md:text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAgree}
              >
                I Agree
              </button>
              <button
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm sm:text-base md:text-lg font-medium px-5 py-2.5 hover:text-customcolor focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mr-2"
                onClick={() => setIsOpentermandcondition(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LabTest;