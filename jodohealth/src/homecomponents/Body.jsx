import React from "react";
import LabTest from "./LabTest";
import Articles from "./Articles";
import Footer from "./Footer";
import networkAds from "../images/networkAds.png"

import Services from "./Services";

const Body = () => {
  return (
    <>
      <main className="maindivuser">
        <LabTest />
        <Services />
        <Articles />
        <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="block w-full bg-black bg-clip-text font-bold text-transparent text-4xl uppercase mb-4 sm:text-5xl">
          Our Partners
        </h2>
        <div className="items-center flex justify-center">
          <h3 className="flex items-center w-36">
            <span className="flex-grow bg-black rounded h-1"></span>
          </h3>
        </div>
      </div>
        <section className="flex justify-center ">
        
          <img src={networkAds} alt="Full width image" className="w-12/12 h-76 " />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Body;
