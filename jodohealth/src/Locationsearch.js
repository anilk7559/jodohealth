import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Box, Dialog, DialogContent} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import { Button } from '@mui/material';
import { Getlablist } from './redux/services/otherServices/Lab';
function LabTest() {
    const [labsdata, setLabsdata] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showNearbyLabs, setShowNearbyLabs] = useState(true); 
    const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpen = () => {
    setOpen(true);
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

    if (res.success === true) {
      setLabsdata(res.response.labs);
    }
  };

    const [nearbyLabsButtonText, setNearbyLabsButtonText] = useState('Find Nearby Labs');
  const labs = [
    {
        "Address": {
            "address": "Dr path labs, building no.1 , nelson mandela marg, vasant kunj",
            "city": "New delhi",
            "zip": "11070"
        },
        "_id": "667cf473f58b3430801a0047",
        "state": "gaurab",
        "Name": "Dr path Labs",
        "contactf": "path",
        "contactN": 91389384748,
        "email": "pathlabs@gmail.com",
        "image": "sdkfl",
        "__v": 0,
        "tests": [],
        "lat": 28.5477,
        "long": 77.1925
    },
    {
        "Address": {
            "address": "Dr saurab labs, building no.8, main bazaar",
            "city": "Mumbai",
            "zip": "67678"
        },
        "_id": "667cf4b6f58b3430801a004c",
        "state": "saurab",
        "Name": "Dr saurabh Labs",
        "contactf": "saurabh",
        "contactN": 9229238403,
        "email": "saurabh@gmail.com",
        "image": "sdkfl",
        "__v": 0,
        "tests": [],
        "lat": 19.0728,
        "long": 72.8826
    },
    {
        "Address": {
            "address": "Dr sham labs,patel nagar",
            "city": "Uttarpardesh",
            "zip": "32344"
        },
        "_id": "667cf50af58b3430801a004e",
        "state": "utrakhand",
        "Name": "Dr sham Labs",
        "contactf": "sham",
        "contactN": 9378302382,
        "email": "sham@gmail.com",
        "image": "sdkfl",
        "__v": 0,
        "tests": [],
        "lat": 26.8467,
        "long": 80.9462
    },
    {
        "Address": {
            "address": "Dr Pinku labs,patel nagar",
            "city": "raavi",
            "zip": "232343"
        },
        "_id": "667cf55af58b3430801a0050",
        "state": "Maharahtra",
        "Name": "Dr pinku Labs",
        "contactf": "asee",
        "contactN": 9234213432,
        "email": "pinku@gmail.com",
        "image": "sdkfl",
        "__v": 0,
        "tests": [],
        "lat": 19.1311,
        "long": 72.9157
    },
    {
        "Address": {
            "address": "Dr saurabh labs,patel nagar",
            "city": "jaipur",
            "zip": "32423"
        },
        "_id": "667cf5b5f58b3430801a0053",
        "state": "rajasthan",
        "Name": "Dr saurbh Labs",
        "contactf": "afddf",
        "contactN": 934233243,
        "email": "saurabh@gmail.com",
        "image": "sdkfl",
        "__v": 0,
        "tests": [],
        "lat": 26.9124,
        "long": 75.7873
    },
    {
        "Address": {
            "address": "Dr tushar labs,loha bajaar",
            "city": "jalandhar",
            "zip": "32455"
        },
        "_id": "667cf60df58b3430801a0055",
        "state": "punjab",
        "Name": "Dr tushar Labs",
        "contactf": "tushar",
        "contactN": 9235456544,
        "email": "tushar@gmail.com",
        "image": "addf",
        "__v": 0,
        "tests": [],
        "lat": 31.3260,
        "long": 75.5762
    },
    {
        "Address": {
            "address": "Dr aneesha labs,loha bajaar",
            "city": "ambala",
            "zip": "23453"
        },
        "_id": "667cf650f58b3430801a0057",
        "state": "jammu",
        "Name": "Dr aneesha Labs",
        "contactf": "aneesha",
        "contactN": 9445321222,
        "email": "aneesha@gmail.com",
        "image": "addf",
        "__v": 0,
        "tests": [],
        "lat": 30.3782,
        "long": 76.7767
    },
    {
        "Address": {
            "address": "Dr mitali labs,loha bajaar",
            "city": "jaipur",
            "zip": "324234"
        },
        "_id": "667cf682f58b3430801a0059",
        "state": "rajasthan",
        "Name": "Dr mitali Labs",
        "contactf": "Mitali",
        "contactN": 9437845433,
        "email": "mitali@gmail.com",
        "image": "addf",
        "__v": 0,
        "tests": [],
        "lat": 26.9124,
        "long": 75.7873
    },
    {
        "Address": {
            "address": "Dr purav labs,loha bajaar",
            "city": "banglore",
            "zip": "32123"
        },
        "_id": "667cf6e5f58b3430801a005c",
        "state": "karnatka",
        "Name": "Dr purav Labs",
        "contactf": "Purav",
        "contactN": 9334877832,
        "email": "purav@gmail.com",
        "image": "addf",
        "__v": 0,
        "tests": [],
        "lat": 12.9716,
        "long": 77.5946
    },
    {
        "Address": {
            "address": "Dr enkatesh labs,loha bajaar",
            "city": "chennai",
            "zip": "32443"
        },
        "_id": "667cf728f58b3430801a0060",
        "state": "Tamil nadu",
        "Name": "Dr enkatesh Labs",
        "contactf": "Enkatesh",
        "contactN": 932872343,
        "email": "asfds@gmail.com",
        "tests": [
            {
                "testName": "ct scan",
                "price": 400,
                "availability": false,
                "_id": "667cf728f58b3430801a0061"
            }
        ],
        "image": "addf",
        "__v": 0,
        "lat": 13.0827,
        "long": 80.2707
    },
    {
        "Address": {
            "address": "Dr enkatesh labs,loha bajaar",
            "city": "chennai",
            "zip": "32443"
        },
        "_id": "667d00111afbc1b84178d128",
        "state": "Tamil nadu",
        "Name": "Dr enkatesh Labs",
        "contactf": "Enkatesh",
        "contactN": 932872343,
        "email": "asfds@gmail.com",
        "tests": [
            {
                "testName": "ct scan",
                "price": 400,
                "availability": false,
                "_id": "667d00111afbc1b84178d129"
            }
        ],
        "image": "addf",
        "__v": 0,
        "lat": 13.0827,
        "long": 80.2707
    },
    {
        "Address": {
            "address": "Dr enkatesh labs,loha bajaar",
            "city": "chennai",
            "zip": "32443"
        },
        "_id": "667d002d1afbc1b84178d12b",
        "state": "Tamil nadu",
        "Name": "Dr enkatesh Labs",
        "contactf": "Enkatesh",
        "contactN": 932872343,
        "email": "asfds@gmail.com",
        "tests": [
            {
                "testName": "ct scan",
                "price": 400,
                "availability": true,
                "_id": "667d002d1afbc1b84178d12c"
            }
        ],
        "image": "addf",
        "__v": 0,
        "lat": 13.0827,
        "long": 80.2707
    },
    {
        "Address": {
            "address": "Dr enkatesh labs,loha bajaar",
            "city": "chennai",
            "zip": "32443"
        },
        "_id": "667d006c1afbc1b84178d131",
        "state": "Tamil nadu",
        "Name": "Dr enkatesh Labs",
        "contactf": "Enkatesh",
        "contactN": 932872343,
        "email": "asfds@gmail.com",
        "tests": [
            {
                "testName": "ct scan",
                "price": 400,
                "availability": true,
                "_id": "667d006c1afbc1b84178d132"
            },
            {
                "testName": "sadf scan",
                "price": 400,
                "availability": true,
                "_id": "667d006d1afbc1b84178d133"
            }
        ],
        "image": "addf",
        "__v": 0,
        "lat": 13.0827,
        "long": 80.2707
    },
    {
        "Address": {
            "address": "Dr enkatesh labs, loha bajaar",
            "city": "Chennai",
            "zip": "32443"
        },
        "_id": "667d20d3504ce569334c38d5",
        "state": "sfdsdaf",
        "Name": "Dr enkatesh Labs",
        "contactf": "Enkatesh",
        "contactN": 932872343,
        "email": "asfds@gmail.com",
        "tests": [
            {
                "testName": "ct scan",
                "price": 400,
                "availability": false,
                "_id": "667d20d3504ce569334c38d6"
            }
        ],
        "image": "Screenshot (11).png",
        "__v": 0,
        "lat": 13.0827,
        "long": 80.2707
    },
    {
        "Address": {
            "address": "Dr enkatesh labs, loha bajaar",
            "city": "Chennai",
            "zip": "32443"
        },
        "_id": "667d2a8282ae84ba387a03b4",
        "state": "adf",
        "Name": "Dr enkatesh Labs",
        "contactf": "Enkatesh",
        "contactN": 932872343,
        "email": "asfds@gmail.com",
        "tests": [
            {
                "testName": "ct scan",
                "price": 400,
                "availability": false,
                "_id": "667d2a8282ae84ba387a03b5"
            }
        ],
        "image": "Screenshot (11).png",
        "__v": 0,
        "lat": 13.0827,
        "long": 80.2707
    },
    {
        "Address": {
            "address": "Dr enkatesh labs, loha bajaar",
            "city": "Chennai",
            "zip": "32443"
        },
        "_id": "667d2aa8f46120ba778fc114",
        "state": "dsafd",
        "Name": "Dr enkatesh Labs",
        "contactf": "Enkatesh",
        "contactN": 932872343,
        "email": "asfds@gmail.com",
        "tests": [
            {
                "testName": "ct scan",
                "price": 400,
                "availability": false,
                "_id": "667d2aa8f46120ba778fc115"
            }
        ],
        "image": "Screenshot (11).png",
        "__v": 0,
        "lat": 13.0827,
        "long": 80.2707
    }
]
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const findNearbyLabs = (userLat, userLong) => {
    const nearbyLabs = labs.filter((lab) => {
      const distance = calculateDistance(userLat, userLong, lab.lat, lab.long);
      return distance <= 1000;
    });

    setSearchResults(nearbyLabs);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLatitude(lat);
          setLongitude(long);

          if (showNearbyLabs) {
            findNearbyLabs(lat, long);
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
  useEffect(()=>{
    handleNearbyLabsButtonClick();
  },[])

  const handleNearbyLabsButtonClick = () => {
    if (!showNearbyLabs) {
      // If nearby labs are not shown, fetch them
      setShowNearbyLabs(true);
      setNearbyLabsButtonText('Clear Nearby Labs');
      getCurrentLocation();
    } else {
      // If nearby labs are shown, clear them
      setShowNearbyLabs(false);
      setSearchResults([]);
      setNearbyLabsButtonText('Find Nearby Labs');
    }
  };

  const filterLabs = (query) => {
    return labs.filter(
      (lab) =>
        lab.Name.toLowerCase().includes(query.toLowerCase()) ||
        lab.Address.city.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.trim() === '') {
      // If search query is empty, reload nearby labs
      getCurrentLocation();
    } else {
      setSearchResults(filterLabs(value));
      setShowNearbyLabs(false); // Hide nearby labs when searching
      setNearbyLabsButtonText('Find Nearby Labs'); // Reset button text
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, reload nearby labs
      getCurrentLocation();
    } else {
      setSearchResults(filterLabs(searchQuery));
      setShowNearbyLabs(false); // Hide nearby labs when searching
      setNearbyLabsButtonText('Find Nearby Labs'); // Reset button text
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
                  {lab.Name}
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-700 font-semibold">
              {lab.Address.address}, {lab.Address.city}, {lab.Address.zip}
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
      // If nearby labs are shown and geolocation is available, fetch nearby labs
      findNearbyLabs(latitude, longitude);
    }
  }, [showNearbyLabs, latitude, longitude]);

  return (
    <div>
      <div className="locationsection-main-div space-x-2">
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
              className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 bg-white-50 placeholder-gray-400"
              placeholder="Search by name or city"
              value={searchQuery}
              onChange={handleSearchChange}
              required
            />
          </div>
        </div>
        <div className="py-1">
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          <IconButton className="search-button" onClick={handleNearbyLabsButtonClick}>
      <AddLocationIcon />
    </IconButton>
        </div>
      </div>

      {searchResults.length === 0 && (
        <section className="flex justify-center py-[4.5rem]">
          <img
            src="./testb.png"
            alt="Full width image"
            className="w-10/12 h-76"
          />
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {showNearbyLabs && renderLabCards()}
        {!showNearbyLabs && searchResults.length > 0 && renderLabCards()}
        <Dialog open = {open} onClose={handleClose} fullWidth maxWidth="lg" >
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
                      <img src="https://onemg.gumlet.io/v1613645053/marketing/phb2bz61etrdmuurfdoq.png" width="133" height="33" className="logo" alt="logo" />
                    </div>
                  </div>
                  <div className="first-heading">More discounts, faster delivery and extra care</div>
                  <div className="second-heading">Join now and enjoy all the benefits</div>
                </div>
                <div className="member-heading">
                  <div>Membership includes</div>
                  <div>
                    <div className="membership-container">
                      <div className="membership-sub">
                        <div className=''>
                          <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                        </div>
                      </div>
                      <div className="plan-heading">Free Shipping</div>
                    </div>
                    <div className="membership-container">
                      <div className="membership-sub">
                        <div>
                          <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                        </div>
                      </div>
                      <div className="plan-heading">1 Free E-consultation</div>
                    </div>
                    <div className="membership-container">
                      <div className="membership-sub">
                        <div>
                          <img src="https://i.postimg.cc/T1cYdz3t/Fill-3-1.png" width="16" height="16" className="tick-img" alt="tick" />
                        </div>
                      </div>
                      <div className="plan-heading">All other benefits mentioned above</div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="choose-plan-section" className="plan-container">
                <div className="choose-plan">Choose a plan that’s right for you</div>
                <div className="planlogo-container">
                  <div
                    className={`price-container ${selectedPlan === '3months' ? 'selected' : ''}`}
                    onClick={() => handlePlanSelect('3months')}
                  >
                    <div className="price-checkbox">
                      <span>
                        {selectedPlan === '3months' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="" fillRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-4l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L19 9.2l-8 8z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="" fillRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                          </svg>
                        )}
                      </span>
                    </div>
                    <div className="price-detail">
                      <div className="price-sub-detail">
                        <div>
                          <span className="price-heading">
                            <span>3 months plan</span>
                            <span className="price-logo">NEW</span>
                          </span>
                        </div>
                      </div>
                      <div className="plan-price">₹165</div>
                      <div className="monthly-price">
                        <span>₹55/month</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`price-container ${selectedPlan === '6months' ? 'selected' : ''}`}
                    onClick={() => handlePlanSelect('6months')}
                  >
                    <div className="price-checkbox">
                      <span>
                        {selectedPlan === '6months' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="" fillRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-4l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L19 9.2l-8 8z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="" fillRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                          </svg>
                        )}
                      </span>
                    </div>
                    <div className="price-detail">
                      <div className="price-sub-detail">
                        <div>
                          <span className="price-heading">
                            <span>6 months plan</span>
                          </span>
                        </div>
                      </div>
                      <div className="plan-price">₹275</div>
                      <div className="monthly-price">
                        <span>₹46/month</span>
                        <span className="monthly-save">Save 16%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="btn-container">
                      <a href="/cart/payment-dcp/60754abd5c9d821af4f7d7a3?addons=true" target="_self" rel="noopener">
                        <div className="btn-heading">
                          <span>Join now</span>
                        </div>
                      </a>
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
    </div>
  );
}

export default LabTest;