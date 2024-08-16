import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaLightbulb } from "react-icons/fa";
const MainSection = () => {
  return (
    <>
      <section className="py-[4.5rem] pb-[10rem] mainsectiondiv">
        <div className="container mx-auto">
          <div className="flex justify-center text-center">
            <div className="lg:w-6/12">
              <h2 className="text-3xl md:text-3xl text-white mb-3 font-medium">
                Easy Steps to get your Solution.
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section section-lg pt-lg-0 pb-[1rem]"
        style={{ display: "flex", marginTop: "-7rem" }}
      >
        <div className="container">
          <div
            className="flex justify-center flex-wrap sm:flex-nowrap"
            style={{ marginRight: "15px", marginLeft: "15px" }}
          >
            <div className="relative w-full pr-3.5 pl-3.5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div
                  className="relative d-flex flex-col"
                  style={{ wordWrap: "break-word", textAlign: "center" }}
                >
                  <div className="transition-transform transform-gpu hover:-translate-y-2 bg-white shadow border-0 rounded-lg">
                    <div className="py-5 px-4">
                      <div
                        className="bg-gradient-to-br to-white rounded-full p-4 w-12 h-12 flex items-center justify-center mb-4 bg-red-400"
                        style={{
                          margin: "6px auto",
                        }}
                      >
                        <span className="text-white font-bold text-2xl text-center">
                          <FaSearch />
                        </span>
                      </div>
                      <h4 className="text-info text-lg font-semibold  mb-3">
                        Find Your Specialist
                      </h4>
                      <p className="text-base text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, tempora culpa est blanditiis mollitia sunt
                        quaerat nobis totam.
                      </p>
                      <div className="mt-4">
                        <span
                          className="badge badge-info badge-pill text-base mr-1 pt-1 pb-1 pr-2 pl-2 text-center font-bold"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          Find Now
                          <FaArrowRight className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="relative d-flex flex-col"
                  style={{ wordWrap: "break-word", textAlign: "center" }}
                >
                  <div className="transition-transform transform-gpu hover:-translate-y-2 bg-white shadow border-0 rounded-lg">
                    <div className="py-5 px-4">
                      <div
                        className="bg-gradient-to-br to-white rounded-full p-4 w-12 h-12 flex items-center justify-center mb-4 bg-green-600"
                        style={{
                          margin: "6px auto",
                        }}
                      >
                        <span className="text-white font-bold text-2xl text-center">
                          <SlCalender />
                        </span>
                      </div>
                      <h4 className="text-info text-lg font-semibold  mb-3">
                        Schedule Appointment
                      </h4>
                      <p className="text-base text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, tempora culpa est blanditiis mollitia sunt
                        quaerat nobis totam.
                      </p>
                      <div className="mt-4">
                        <span
                          className="badge badge-info badge-pill text-base mr-1 pt-1 pb-1 pr-2 pl-2 text-center font-bold"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          Schedule Now
                          <FaArrowRight className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="relative d-flex flex-col"
                  style={{ wordWrap: "break-word", textAlign: "center" }}
                >
                  <div className="transition-transform transform-gpu hover:-translate-y-2 bg-white shadow border-0 rounded-lg">
                    <div className="py-5 px-4">
                      <div
                        className="bg-gradient-to-br to-white rounded-full p-4 w-12 h-12 flex items-center justify-center mb-4 bg-amber-600 "
                        style={{
                          margin: "6px auto",
                        }}
                      >
                        <span className="text-white font-bold text-2xl text-center">
                          <FaLightbulb />
                        </span>
                      </div>
                      <h4 className="text-info text-lg font-semibold  mb-3">
                        Get Your Solution
                      </h4>
                      <p className="text-base text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, tempora culpa est blanditiis mollitia sunt
                        quaerat nobis totam.
                      </p>
                      <div className="mt-4">
                        <span
                          className="badge badge-info badge-pill text-base mr-1 pt-1 pb-1 pr-2 pl-2 text-center font-bold"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          Waiting For an Appointment
                          <FaArrowRight className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
