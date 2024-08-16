
import React from "react";
import ctscan from "../images/MRI-2.png";
import mriscan from "../images/MRI-icon.png";
import petscan from "../images/Indoscopy-icon.png";
import xray from "../images/X-ray-icon.png";
import ultrasound from "../images/Ultrasound-icon.png";
import bloodtest from "../images/blood-test-icon.png";
import ecg from "../images/ECG-icon.png";
import spirometry from "../images/Spirometry-icon.png";
import bonedensity from "../images/Bone-density-icon.png";
import Colonoscopy from "../images/Colonoscopy-icon.png";
import Endoscopy  from "../images/Indoscopy-icon.png";
import StressTest  from "../images/Master-health-checkuo-icon-2.png";
import EEG from "../images/Ultrasound-icon.png";
import Mammogram from "../images/MRI-2.png";
import HolterMonitor  from "../images/Spirometry-icon.png";
import GeneticTesting  from "../images/Master-health-checkuo-icon.png";
import AllergyTesting  from "../images/blood-test-icon.png";
import PSA  from "../images/ECG-icon.png";
import Thyroid  from "../images/Master-health-checkuo-icon-2.png";
import labtest  from "../images/Claim-Assistence.png";
import consoulations  from "../images/Consultations.png";
const Services = () => {
  return (
    <section id="features" className="relative block px-8 py-10 md:py-20 md:px-20">
      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="block w-full bg-black bg-clip-text font-bold text-transparent text-4xl uppercase mb-4 sm:text-5xl">
          Our Services
        </h2>
        <div className="items-center flex justify-center">
          <h3 className="flex items-center w-36">
            <span className="flex-grow bg-black rounded h-1"></span>
          </h3>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex animate-marquee">
          {Array(2).fill(
            <>
              <div className="service-item">
                <img src={ctscan} alt="Service one" className="service-image" />
                <h3 className="service-title">CT Scan</h3>
              </div>
              <div className="service-item">
                <img src={StressTest} alt="Service two" className="service-image" />
                <h3 className="service-title">Master Health Checkup</h3>
              </div>
              <div className="service-item">
                <img src={mriscan} alt="Service three" className="service-image" />
                <h3 className="service-title">MRI Scan</h3>
              </div>
              <div className="service-item">
                <img src={petscan} alt="Service four" className="service-image" />
                <h3 className="service-title">PET Scan</h3>
              </div>
              <div className="service-item">
                <img src={xray} alt="Service five" className="service-image" />
                <h3 className="service-title">X-Ray</h3>
              </div>
              <div className="service-item">
                <img src={ultrasound} alt="Service six" className="service-image" />
                <h3 className="service-title">Ultrasound</h3>
              </div>
              <div className="service-item">
                <img src={bloodtest} alt="Service seven" className="service-image" />
                <h3 className="service-title">Blood Tests</h3>
              </div>
              <div className="service-item">
                <img src={ecg} alt="Service eight" className="service-image" />
                <h3 className="service-title">ECG (Electrocardiogram)</h3>
              </div>
              <div className="service-item">
                <img src={spirometry} alt="Service nine" className="service-image" />
                <h3 className="service-title">Spirometry</h3>
              </div>
              <div className="service-item">
                <img src={bonedensity} alt="Service ten" className="service-image" />
                <h3 className="service-title">Bone Density Scan</h3>
              </div>
              <div className="service-item">
                <img src={Colonoscopy} alt="Service eleven" className="service-image" />
                <h3 className="service-title">Colonoscopy</h3>
              </div>
              <div className="service-item">
                <img src={Endoscopy} alt="Service twelve" className="service-image" />
                <h3 className="service-title">Endoscopy</h3>
              </div>
              <div className="service-item">
                <img src={Mammogram} alt="Service thirteen" className="service-image" />
                <h3 className="service-title">Mammogram</h3>
              </div>
              <div className="service-item">
                <img src={StressTest} alt="Service fourteen" className="service-image" />
                <h3 className="service-title">Stress Test</h3>
              </div>
              <div className="service-item">
                <img src={labtest} alt="Service nineteen" className="service-image" />
                <h3 className="service-title">Lab Tests</h3>
              </div>
              <div className="service-item">
                <img src={consoulations} alt="Service twenty" className="service-image" />
                <h3 className="service-title">Consultations</h3>
              </div>
              <div className="service-item">
                <img src={EEG} alt="Service fifteen" className="service-image" />
                <h3 className="service-title">EEG (Electroencephalogram)</h3>
              </div>
              <div className="service-item">
                <img src={HolterMonitor} alt="Service sixteen" className="service-image" />
                <h3 className="service-title">Holter Monitor</h3>
              </div>
              <div className="service-item">
                <img src={GeneticTesting} alt="Service seventeen" className="service-image" />
                <h3 className="service-title">Genetic Testing</h3>
              </div>
              <div className="service-item">
                <img src={AllergyTesting} alt="Service eighteen" className="service-image" />
                <h3 className="service-title">Allergy Testing</h3>
              </div>
              <div className="service-item">
                <img src={PSA} alt="Service nineteen" className="service-image" />
                <h3 className="service-title">Prostate-Specific Antigen (PSA) Test</h3>
              </div>
              <div className="service-item">
                <img src={Thyroid} alt="Service twenty" className="service-image" />
                <h3 className="service-title">Thyroid Function Test</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
