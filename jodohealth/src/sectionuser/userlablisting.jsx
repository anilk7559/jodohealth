import React, { useEffect, useState } from 'react';
import { Getlablist } from '../redux/services/otherServices/Lab';
import { getData, storageKey } from '../constants/storage';
import { toast } from 'react-toastify';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../homecomponents/Footer";
import Header from "../homecomponents/Header";
import { Loader } from "../constants/Loader";
import networkAds from "../images/networkAds.png";
import { getMemberlist, makeAppointment } from '../redux/services/otherServices/Users';
import { Typography, TextField } from '@mui/material';
function Userlablisting() {
  const location = useLocation();
  const navigate = useNavigate();
  const [memberdata, setmemberdata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [labsdata, setLabsdata] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showNearbyLabs, setShowNearbyLabs] = useState(false); // Initially show all labs
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [prescriptionfile, setprescriptionfile] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedlabid,setSelectedLabId]=useState("");

  const handleChangememberselect = (event) => {
    setSelectedMemberId(event.target.value);
    console.log('Selected Member ID:', event.target.value);
  };
  useEffect(() => {
    const colors = [ 'rgb(13 121 173)', '#32CD32'];
    const interval = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const colors = [ 'rgb(13 121 173)', '#32CD32'];
  useEffect(() => {
    handleGetLabData();
  }, []);

  useEffect(() => {
    if (showNearbyLabs && latitude && longitude) {
      findNearbyLabs(latitude, longitude);
    } else {
      setSearchResults([]);
    }
  }, [showNearbyLabs, latitude, longitude]);
  const handleOpen = (lab) => {
    setSelectedLabId(lab?.id);
    const data = getData(storageKey.USER_LOGIN);
    const subscription = getData(storageKey.SUBSCRIPTION);

    if (data === "User") {
      if (subscription === "1") {
        toast.error("Subscribe first");
      } else if (subscription === "0") {
            setShowModal(true);
      } else {
        toast.error("Invalid subscription value");
      }
    } else {
      toast.error("Please login first");
    }
  };

  const handleGetLabData = async () => {
    const res = await Getlablist();
    console.log(res.response?.body?.findLab, "i am  labs data from ashwin");

    if (res.success === true) {
      setLabsdata(res.response?.body?.findLab);
    }
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

  const handleNearbyLabsButtonClick = () => {
    if (!showNearbyLabs) {
      setShowNearbyLabs(true);
      getCurrentLocation();
    } else {
      setShowNearbyLabs(false);
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
      setSearchResults([]);
    } else {
      console.log(filterLabs(value), "filterLabs(value)");
      setSearchResults(filterLabs(value));
      setShowNearbyLabs(false);
    }
  };

  const renderLabCards = () => {
    let labsToRender = [];
    if (showNearbyLabs && searchQuery.trim() === '') {
      labsToRender = searchResults;
    } else if (searchQuery.trim() !== '') {
      labsToRender = filterLabs(searchQuery);
    } else {
      labsToRender = labsdata;
    }
    return labsToRender.map((lab) => (
      <div key={lab._id} className="flex justify-center">
        <div className="w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-xl font-bold text-skyblue-900">
                  {lab.name}
                </span>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <span className="text-1xl font-bold text-orange-600">
                    {lab.discount}%
                  </span>
                  <span className="absolute text-sm font-bold text-green-600 top-1 right-0 transform translate-x-1/2 translate-y-1/2">
                    Off
                  </span>
                </div>
              </div>

            </div>
            <p className="mb-4 font-semibold">
              {lab.fullAddress}, {lab.city}, {lab.state}, {lab.pincode}
            </p>
          </div>
          <div className="mt-auto">
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white buttoncolor rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:buttoncolor dark:focus:ring-blue-800"
              onClick={() => handleOpen(lab)}
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('lab_id', selectedlabid);
    formData.append('appointment_date', selectedDate);
    formData.append('member_id', selectedMemberId);
    if (prescriptionfile) {
        formData.append('prescription_image', prescriptionfile);
    }
    if (prescription) {
        formData.append('prescription', prescription);
    }
    const body = {
      lab_id: selectedlabid,
      appointment_date: selectedDate,
      member_id: selectedMemberId,
      prescription_image:prescriptionfile,
      prescription:prescription
  };

    try {
        const res = await makeAppointment(formData);
        console.log(body,"bodybodybodybodyvvvvvvb");
        if (res.success) {
            toast.success("Appointment booked successfully");
            handleCloseModal();
            setSelectedLabId("");
            setSelectedDate("");
            setprescriptionfile(null);
            setPrescription("");
            setSelectedMemberId("");
        } else {
            toast.error("Failed to book appointment. Please try again.");
        }
    } catch (error) {
        toast.error("An error occurred. Please try again.");
    }
};

  useEffect(() => {
    getMemberList();
}, []);

const getMemberList = async () => {

    try {
        const res = await getMemberlist();
        if (res.success === true) {
          setmemberdata(res.response?.body?.findMembers);
        } else {
            toast.error('Failed to fetch member data.');
        }
    } catch (error) {
        console.error('Error fetching member data:', error);
        toast.error('An error occurred while fetching member data.');
    } 
};
  return (
    <div>
      {loading && <Loader />}
      <Header />
      <section className="listingdiv" style={{ background: "rgb(239, 242, 244)" }}>
        <div className="lg:w-6/12 mx-auto flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-3xl text-black font-bold">
              Book Appointment
            </h1>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-2xl text-black font-normal">
              Get best deals on tests across 1000+ labs
            </h1>
          </div>
        </div>
        <div className="locationsection-main-div space-x-4">
          <div className="py-2">
            <label htmlFor="search" className="text-sm font-medium text-gray-900 sr-only">
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
            <div className="flex items-center py-2">
              <ArrowRightAltIcon sx={{ color: 'gray', mr: 1 }} />
            </div>
          </div>
          <div className="py-1">
            <button className="blinking-button"
              style={{ backgroundColor: colors[colorIndex], borderRadius: "7px" }} onClick={handleNearbyLabsButtonClick}>
              {showNearbyLabs ? "Show All Labs" : "Search Labs Nearby Me"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {renderLabCards()}
        </div>
      </section>

      <section className="flex justify-center py-[4.5rem]">
        <img src={networkAds} alt="Full width image" className="w-10/12 h-76" />
      </section>

      <Footer />
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center">
                <Typography variant="h6" component="h2" gutterBottom sx={{ color: "rgb(13 121 173)" }}>
                  Book Appointment
                </Typography>
                <form onSubmit={handleModalSubmit}>
                  <div className="mb-4">
                    <Typography htmlFor="date" className="block text-sm font-medium mb-1" style={{ color: "rgb(13 121 173)" }}>Select Date</Typography>
                    <TextField
                      type="date"
                      id="date"
                      className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Typography htmlFor="prescription" className="block text-sm font-medium mb-1" style={{ color: "rgb(13 121 173)" }}>Prescription</Typography>
                    <textarea
                      id="prescription"
                      className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md"
                      rows="3"
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      placeholder="Enter prescription (optional)"
                    />
                  </div>
                  <Typography>Or</Typography>
                  <div className="mb-4">
                    <Typography htmlFor="date" className="block text-sm font-medium mb-1" style={{ color: "rgb(13 121 173)" }}>Upload File</Typography>
                    <TextField
                      type="file"
                      id="file"
                      className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md"

                      onChange={(e) => setprescriptionfile(e.target.value)}

                    />
                  </div>
                  <div className="mb-4">
      <Typography
        htmlFor="member"
        className="block text-sm font-medium mb-1"
        style={{ color: "rgb(13 121 173)" }}
      >
        Select Member
      </Typography>
      <select
        id="member"
        className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-md"
        required
        value={selectedMemberId}
        onChange={handleChangememberselect}
      >
        <option value="" disabled>Select a member</option>
        {memberdata.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
    </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="mr-4 py-2 px-4 text-sm font-medium bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      onClick={handleCloseModal}
                      style={{ color: "rgb(13 121 173)" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 text-sm font-medium text-white "
                      style={{ backgroundColor: "rgb(13 121 173)", color: "white", borderRadius: "6px" }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userlablisting;


