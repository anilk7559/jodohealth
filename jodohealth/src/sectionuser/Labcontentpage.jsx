
import React, { useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import headerimage from "../images/headerimage.jpg"
import homeSamplePickup from "../images/home_sample_pickup.webp"
import signup from "../images/sign-up-icon.png"
import service from "../images/select-a-service-icon.png"
import appointment from "../images/book-appointment-icon.png"
import gettested from "../images/get-tested-icon.png"
import receviedresults from "../images/receive-result-icon.png"
import injoybenefits from "../images/enjoy-benefits-icon.png"
import e_reports from "../images/e_reports_on_next_day.webp"
import offers from "../images/offers.webp"
import Header from '../homecomponents/Header';
import Footer from '../homecomponents/Footer';
import biopsy from "../images/Biopsy.jpg";
import Colonoscopy from "../images/Colonoscopy.jpg";
import ctscan from "../images/CT-scan.jpg";
import ECG from "../images/ECG.jpg";
import EEG from "../images/EEG.jpg";
import Gastroscopy from "../images/Gastroscopy.jpg";
import eyetest from "../images/Eye-test.jpg";
import Hearingtest from "../images/Hearing-test.jpg";
import mri from "../images/MRI-test.jpg";
import petscan from "../images/PET-scan.jpg";
import ultrasound from "../images/Ultrasound.jpg";
import xray from "../images/X-ray.jpg";
import bonehealth from "../images/Bone-health.svg";
import cancerscreening from "../images/Cancer-screening.svg";
import diabetes from "../images/Diabetes.svg";
import digestivehealth from "../images/Digestive-health.svg";
import hearthealth from "../images/Heart-health.svg";
import kidney from "../images/Kidney-health.svg";
import liverfuntion from "../images/Liver-function.svg";
import Neurological from "../images/Neurological-concerns.svg";
import Respiratory from "../images/Respiratory-issues.svg";
import Thyroiddisorders from "../images/Thyroid-disorders.svg";
const tests = [
  { name: "Biopsy", price: "₹300", description: "Biopsies are used by doctors to diagnose medical conditions. Discover more about what biopsies are, the different types, and why they may be necessary.", report: "E-Reports on next day", image: biopsy },
  { name: "Colonoscopy", price: "₹434", description: "A colonoscopy is a procedure that allows doctors to examine the inside of the large bowel to diagnose medical conditions.", report: "E-Reports on next day", image: Colonoscopy }, 
  { name: "CT Scan", price: "₹673", description: "A computed tomography (CT) scan creates a 3D image of your body using a machine that rotates around you. Learn more about CT scans here.", report: "E-Reports on next day", image: ctscan },
  { name: "Electrocardiogram (ECG)", price: "₹300", description: "An electrocardiogram (ECG) is used to determine the health of your heart. Find out more about ECGs and why you might need one.", report: "E-Reports on next day", image: ECG },
  { name: "Electroencephalogram (EEG)", price: "₹490", description: "An electroencephalogram (EEG) measures brain activity to diagnose or monitor conditions like epilepsy. Learn more about this test.", report: "E-Reports on next day", image: EEG },
  { name: "Gastroscopy", price: "₹400", description: "A gastroscopy is a procedure to examine the inside of your esophagus and stomach. Find out what happens during a gastroscopy and when it's needed.", report: "E-Reports on next day", image: Gastroscopy },
  { name: "Eye Tests", price: "₹400", description: "Regular eye tests can detect problems before symptoms appear. You don't need a referral to see an optometrist. Learn more about eye tests.", report: "E-Reports on next day", image: eyetest },
  { name: "Hearing Test", price: "₹400", description: "Hearing tests identify and measure the severity of hearing loss. Discover who needs a hearing test and the different types available.", report: "E-Reports on next day", image: Hearingtest },
  { name: "MRI Scan", price: "₹400", description: "An MRI scan uses magnets, radio waves, and a computer to create images of your body's soft tissues. Check out the benefits, the procedure, and the potential risks associated with this procedure.", report: "E-Reports on next day", image: mri },
  { name: "PET Scan", price: "₹400", description: "A positron emission tomography (PET) scan is an imaging test used to diagnose certain diseases. Learn about what the scan involves and how it works.", report: "E-Reports on next day", image: petscan },
  { name: "Ultrasound", price: "₹400", description: "An ultrasound scan creates a real-time image of the inside of your body using sound waves. Learn about the uses, types, and preparation for ultrasounds.", report: "E-Reports on next day", image: ultrasound },
  { name: "X-rays", price: "₹400", description: "X-rays use radiation to create images of the inside of your body. The X-ray beam is absorbed differently by various body structures to create the image.", report: "E-Reports on next day", image: xray }

];
const tests2 = [
  { name: "Heart Health", image: hearthealth },
  { name: "Diabetes", image: diabetes },
  { name: "Cancer Screening", image: cancerscreening },
  { name: "Liver Function", image: liverfuntion },
  { name: "Kidney Health", image: kidney },
  { name: "Thyroid Disorders", image: Thyroiddisorders },
  { name: "Bone Health", image: bonehealth },
  { name: "Respiratory Issues", image: Respiratory },
  { name: "Digestive Health", image: digestivehealth },
  { name: "Neurological Concerns", image: Neurological }
];
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} rounded-full`}
      style={{ ...style, display: "block", background: "wheat", right: "14px", width: "39px" }}
      onClick={onClick}
    />
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} rounded-full `}
      style={{
        ...style, display: "block", left: "1px", zIndex: 1, background: "wheat"
      }}
      onClick={onClick}
    />
  );
}
const Labcontentpage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleReadMore = (index) => {
    setExpandedIndex(index);
  };

  const handleClose = (event) => {
    // Prevent the card's onClick event from being triggered
    setExpandedIndex(null);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1164,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          dots: false
        }
      },
      {
        breakpoint: 946,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          initialSlide: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          centerMode: true, // Center mode for screens below 700px
          centerPadding: '10px'
        }
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Center mode for screens below 700px
        }
      }
    ]
  };
  return (
    <>
      <Header />
      {/* <div class="relative w-full h-[320px]" id="home">
        <div class="absolute inset-0 ">
           
    
       </div>
    </div> */}
      <img src={headerimage} alt="Background Image" class="   w-full h-full" />
      <div class="pt-5 inset-x-0 bottom-0 pb-2 sm:pb-5 z-50 mb-3">
        <div class="mx-auto  px-2 sm:px-6 lg:px-8">
          <div class="rounded-lg p-2 shadow-lg sm:p-3" style={{ background: "rgb(13 121 173)" }}>
            <div class="flex flex-wrap items-center justify-between">
              <div class="flex w-0 flex-1 items-center">

                <p class="ml-3 truncate font-medium text-white">
                  <span class="hidden md:inline">Need help with booking your test?</span>
                </p>
              </div>
              <div class="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                <a class="flex items-center justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-white shadow-sm"
                  href="#">+91 93988 44881
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* <!-- our services section --> */}
      <section className="font-[sans-serif] text-[#333] mb-3">
        <div className=" mx-auto">
          <div className="text-start mx-5">
            <h3 className="text-2xl font-bold mb-2">Diagnostic Tests</h3>
          </div>
          <div className="mx-5 mt-4 relative">
            <Slider {...settings}>
              {tests.map((test, index) => (
                <div
                  key={index}
                  className={`p-1 ${expandedIndex !== null && expandedIndex !== index ? 'blur-sm' : ''}`}
                  onClick={() => { expandedIndex === index ? handleClose() : handleReadMore(index) }}
                  style={{ zIndex: expandedIndex === index ? 10 : 1 }}
                >
                  <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-w-2xl w-full' : 'max-w-xs w-64'}`}>
                    <img
                      src={test.image}
                      alt="Test"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-800 mb-1">{test.name}</h3>
                      <p className={`text-gray-700 text-sm ${expandedIndex === index ? '' : 'h-12 overflow-hidden'}`}>{test.description}</p>
                      {expandedIndex === index && (
                        <p className="text-gray-700 text-sm mt-2">{test.report}</p>
                      )}
                      {expandedIndex === index ? (
                        <button
                          className="text-blue-500 text-sm mt-2"
                          onClick={handleClose}
                        >
                          Close
                        </button>
                      ) : (
                        <button
                          className="text-blue-500 text-sm mt-2 p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReadMore(index);
                          }}
                        >
                          Read More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>


      <section className="font-[sans-serif] text-[#333] mb-2 mt-6">
        <div className=" mx-auto">
          <div className="text-center mx-5">
            <h3 className="text-2xl font-bold mb-2">Find Test By Health Concern</h3>
          </div>
          <div className="text-start mx-5">
            <h3 className="text-2xl font-bold mb-2">Common Health Concerns and Recommended Tests</h3>
          </div>
          <div className="mx-5 relative">
            <Slider {...settings}>
              {tests2.map((test, index) => (
                <div
                  key={index}
                  className={`p-1 transition-all duration-500 ease-in-out `}
                >
                  <div className={`overflow-hidden w-64`}>
                    <div className="mt-10 flex justify-center mb-5 grow">
                      <img src={test.image} className="rounded-full" alt={test.name} />
                    </div>
                    <h1 className="text-xl text-black font-bold mt-2 text-center">
                      {test.name}
                    </h1>
                    <div className="p-4">
                      <p className="text-gray-700 text-sm mt-2">{test.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>


      <section className='p-8 md:p-16' style={{ background: "#f0f8ff" }}>
        <div className='text-center mb-8'>
          <h2 className='text-2xl lg:text-3xl font-bold'>Why Book with us?</h2>
        </div>
        <div className='flex flex-col lg:flex-row flex-wrap justify-start items-start'>
          {/* Item 1 */}
          <div className='flex items-start mb-4 w-full lg:w-1/2 p-2'>
            <div className='w-20 h-16 mr-2'>
              <img src={homeSamplePickup} alt="Home sample collection" />
            </div>
            <div>
              <p className='font-semibold text-lg'>Top-Quality Healthcare Partners</p>
              <p className='font-normal'> We collaborate with leading labs and healthcare providers to ensure you receive the best care..</p>
            </div>

          </div>

          {/* Item 2 */}
          <div className='flex items-start mb-4 w-full lg:w-1/2 p-2'>
            <div className='w-20 h-16 mr-2'>
              <img src={e_reports} alt="Digital report" />
            </div>
            <div>
              <p className='font-semibold text-lg'>Exclusive Discounts</p>
              <p className='font-normal'>Take advantage of special discounts on a wide range of lab tests.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className='flex items-start mb-4 w-full lg:w-1/2 p-2'>
            <div className='w-20 h-16 mr-2'>
              <img src={offers} alt="Offers and prices" />
            </div>
            <div>
              <p className='font-semibold text-lg'>Offers and affordable prices</p>
              <p className='font-normal'>Get great discounts and offers on tests and packages.</p>
            </div>
          </div>

          <div className='flex items-start mb-4 w-full lg:w-1/2 p-2'>
            <div className='w-20 h-16 mr-2'>
              <img src={offers} alt="Offers and prices" />
            </div>
            <div>
              <p className='font-semibold text-lg'>Convenient Scheduling</p>
              <p className='font-normal'>Our simple booking system lets you schedule appointments easily.</p>
            </div>
          </div>
        </div>
      </section>




      <section className='p-8 md:p-16'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl lg:text-3xl font-bold'>How We Works?</h2>
        </div>
        <div className='flex flex-col lg:flex-col justify-evenly items-start lg:items-center '>

          <div className='flex flex-col lg:flex-row justify-evenly items-start lg:items-center mb-4'>
            {/* Step 1 */}
            <div className='flex items-center mb-4 lg:mb-0  w-full lg:w-80'>
              <div className='w-22 h-16 mr-2'>
                <img src={signup} alt="Home sample collection" className='w-full h-full object-contain' />
              </div>
              <div>
                <h5 className='font-semibold text-lg'>Sign Up</h5>
                <p className='font-normal text-sm text-center lg:text-left'> Become a member by signing up through our website or app.</p>
              </div>
            </div>
            <span className="flex-grow-0 border-t border-gray-500 opacity-50 mx-2 w-10 hidden lg:block"></span>

            {/* Step 2 */}
            <div className='flex items-center mb-4 lg:mb-0  w-full lg:w-80'>
              <div className='w-22 h-16 mr-2'>
                <img src={service} alt="Digital report" className='w-full h-full object-contain' />
              </div>
              <div>
                <div>
                  <h5 className='font-semibold text-lg'>Select a Service</h5>
                  <p className='font-normal text-sm text-center lg:text-left'> Choose from a variety of lab tests and healthcare services offered by our top-quality partners.
                  </p>
                </div>      </div>
            </div>
            <span className="flex-grow-0 border-t border-gray-500 opacity-50 mx-2 w-10 hidden lg:block"></span>

            {/* Step 3 */}
            <div className='flex items-center mb-4 lg:mb-0  w-full lg:w-80'>
              <div className='w-22 h-16 mr-2'>
                <img src={appointment} alt="Offers and prices" className='w-full h-full object-contain' />
              </div>
              <div>
                <div>
                  <h5 className='font-semibold text-lg'>Book an Appointment</h5>
                  <p className='font-normal text-sm text-center lg:text-left'> Use our convenient booking system to schedule your lab appointment at a time that suits you.
                  </p>
                </div>
              </div>
            </div>
          </div>



          <div className='flex flex-col lg:flex-row justify-evenly items-start lg:items-center'>
            {/* Step 4 */}
            <div className='flex items-center mb-4 lg:mb-0  w-full lg:w-80'>
              <div className='w-22 h-16 mr-2'>
                <img src={gettested} alt="Offers and prices" className='w-full h-full object-contain' />
              </div>
              <div>
                <div>
                  <h5 className='font-semibold text-lg'>Get Tested</h5>
                  <p className='font-normal text-sm text-center lg:text-left'>Visit the selected lab at your scheduled time and get your tests done efficiently and professionally.
                  </p>
                </div>
              </div>
            </div>
            <span className="flex-grow-0 border-t border-gray-500 opacity-50 mx-2 w-10 hidden lg:block"></span>
            {/* Step 5 */}
            <div className='flex items-center mb-4 lg:mb-0  w-full lg:w-80'>
              <div className='w-22 h-16 mr-2'>
                <img src={receviedresults} alt="Offers and prices" className='w-full h-full object-contain' />
              </div>
              <div>
                <div>
                  <h5 className='font-semibold text-lg'>Receive Results</h5>
                  <p className='font-normal text-sm text-center lg:text-left'> Access your lab results online quickly and securely.
                  </p>
                </div>
              </div>
            </div>
            <span className="flex-grow-0 border-t border-gray-500 opacity-50 mx-2 w-10 hidden lg:block"></span>
            {/* Step 6 */}
            <div className='flex items-center mb-4 lg:mb-0  w-full lg:w-80'>
              <div className='w-22 h-16 mr-2'>
                <img src={injoybenefits} alt="Offers and prices" className='w-full h-full object-contain' />
              </div>
              <div>
                <div>
                  <h5 className='font-semibold text-lg'>Enjoy Benefits</h5>
                  <p className='font-normal text-sm text-center lg:text-left'> Take advantage of priority booking, exclusive discounts, and other membership benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>



      </section>

      <Footer />


    </>
  )
}

export default Labcontentpage