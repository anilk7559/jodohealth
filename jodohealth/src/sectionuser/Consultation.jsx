import React from 'react';
import looka from '../images/looka.png'
import homeSamplePickup from "../images/home_sample_pickup.webp"
import e_reports from "../images/e_reports_on_next_day.webp"
import offers from "../images/offers.webp"

import Header from '../homecomponents/Header';
import Footer from '../homecomponents/Footer';
const Consultation = () => {

  const conditions1 = [
    { name: "Diabetes", info: "A chronic condition that affects how your body processes blood sugar.",symptoms:"Frequent urination, excessive thirst, unexplained weight loss." },
    { name: "Hypertension (High Blood Pressure", info: "A condition where the force of the blood against the artery walls is too high.",symptoms:"Often asymptomatic, but can cause headaches, shortness of breath, or nosebleeds."},
    { name: "Thyroid Disorders", info: " Conditions affecting the thyroid gland, such as hypothyroidism or hyperthyroidism.",symptoms:"Weight changes, fatigue, hair loss, mood swings."},
    { name: "Cancer", info: "A group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.",symptoms:" Vary widely but may include lumps, unexplained weight loss, and persistent cough." },
    { name: "Heart Disease", info: "A range of conditions affecting the heart, including coronary artery disease, arrhythmias, and heart failure.",symptoms:" Chest pain, shortness of breath, palpitations." },
    { name: "Respiratory Infections", info: "Infections that affect the respiratory system, such as the common cold, flu, and pneumonia." ,symptoms:"Cough, fever, sore throat, difficulty breathing."},
    { name: "Digestive Disorders", info: " Conditions affecting the digestive tract, including IBS, Crohn’s disease, and acid reflux. ",symptoms:"Abdominal pain, bloating, changes in bowel habits." },
    { name: " Mental Health Conditions", info: " Disorders that affect mood, thinking, and behaviour, such as depression, anxiety, and bipolar disorder.",symptoms:"Persistent sadness, excessive worry, mood swings." },
  ];

  const conditions2 = [
    { name: "Arthritis", info: " A long-term condition where the kidneys do not function effectively." ,symptoms:"Joint pain, swelling, reduced range of motion."},
    { name: "Chronic Kidney Disease", info: " Blood pressure is the force of your blood pushing against the walls of your arteries",symptoms:"Swelling in legs, changes in urination, fatigue." },
    { name: "Asthma", info: "An inflammatory condition of the lungs that affects the airways.",symptoms:"Coughing, wheezing, shortness of breath, chest tightness.  " },
    { name: "Allergies", info: "  An immune system response to a foreign substance that’s not typically harmful." ,symptoms:"Sneezing, itching, runny nose, hives."},
    { name: "Anemia", info: "A condition where you lack enough healthy red blood cells to carry adequate oxygen to your tissues.",symptoms:" Fatigue, weakness, pale skin, shortness of breath." },
    { name: "Obesity", info: "A complex disease involving an excessive amount of body fat.",symptoms:"Increased body weight, difficulty with physical activity, potential for various related health issues." },
    { name: "Osteoporosis", info: " A condition in which bones become weak and brittle.",symptoms:"Back pain, loss of height, a stooped posture, bone fractures." },
    { name: "Migraines", info: " Intense headaches often accompanied by nausea and sensitivity to light and sound." ,symptoms:"Severe throbbing pain, usually on one side of the head, nausea, sensitivity to light and sound."},
  ];


  return (
    <div>
      <Header/>
      <div className="bookAppointmentBody">
        <div className="relative w-full h-[320px]" id="home">
          <div className="absolute inset-0 opacity-70">
            <img 
              src="https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125_1280.jpg" 
              alt="Background" 
              className="object-cover object-center w-full h-full" 
            />
          </div>
          <div className="absolute inset-9 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h1 className="text-black font-medium text-4xl md:text-5xl leading-tight mb-2">
                Jodo Health Care
              </h1>
              <p className="font-regular text-xl mb-8 mt-4">Reliable Lab Testing and Expert Medical Consultations All in One Place</p>
              <a 
                href="#contactUs"
                className="px-6 py-3 bg-customcolor text-white font-medium rounded-full transition duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>


      <section class="sm:mt-6 lg:mt-8 mt-12 mx-auto px-4 sm:px-6 lg:px-8">

<div class="my-10 mx-auto  px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-6 lg:flex-justify lg:flex flex-col ">
    
    <div class="lg:w-full flex flex-col justify-center items-center">
        <h1 class="text-[35px] tracking-tight font-medium text-customcolor sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Our Team of Doctors</span>
        </h1>

 
    </div>
    <div className='flex flex-col lg:flex-row justify-between gap-3'>
    <div class="mt-6 text-base text-gray-500 sm:mt-8 sm:text-lg sm:max-w-xl md:mt-8 md:text-xl lg:mx-0">
            {/* <div class="mb-4 flex flex-row items-center gap-3 mt-[4.8vw]  ">
              <div className=''>
             <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADFSURBVHgBpZKxDcIwEEX/mQZRJRIDZIRsQChTsgEbhAmQRyAbsAGiSglskBE8AFIoafBhHw5KgYgRr0rse9aXvwmB7qATzCYV2BYg5GAkbrl9MNXzcrvHABKh0RmITu4zw2cMmJdpqY3/US/1qwDZczOSxkvXRq9HhLdop9iINCGqEIkiWvTxcsRT9NLPeOkcPU1oRbLMl2jJUi2SumMH38M4Jg0lq3Slb764EdGEmZByQOc7I7gKKNwot+45HeHSyOH/8AQtCjoWHv6pVwAAAABJRU5ErkJggg=='></img>
              </div>
                <p className=''>Doctors from across specialties under a single roof.</p>
            </div> */}

          <div className='flex flex-col justify-start items-start gap-3'>
        <h3 className='font-semibold text-lg text-customcolor'>General Physicians</h3>
        <h5 className='font-semibold text-lg ml-3'>Expertise:<span className='font-normal text-base ml-1'>Our general physicians are skilled in diagnosing and treating a wide range of common health issues. They focus on preventive care and routine check-ups to help you maintain optimal health.</span></h5>
        <h5 className='font-semibold text-lg ml-3'>Approach:<span className='font-normal text-base ml-1'> Personalised care with a focus on understanding your unique health needs and lifestyle.</span></h5>

        </div>

        <div className='flex flex-col justify-start items-start mt-4 gap-3'>
        <h3 className='font-semibold text-lg text-customcolor'>Cardiologists</h3>
        <h5 className='font-semibold text-lg ml-3'>Expertise:<span className='font-normal text-base ml-1'> Specialising in heart health, our cardiologists provide comprehensive care for conditions such as hypertension, heart disease, and arrhythmias.
        </span></h5>
        <h5 className='font-semibold text-lg ml-3'>Approach:<span className='font-normal text-base ml-1'> Utilising advanced diagnostic tools and innovative treatments to ensure your heart is in the best possible condition.</span></h5>

        </div>
        <div className='flex flex-col justify-start items-start mt-4 gap-3'>
        <h3 className='font-semibold text-lg text-customcolor'>Neurologists</h3>
        <h5 className='font-semibold text-lg ml-3'>Expertise:<span className='font-normal text-base ml-1'>
        Our neurologists are experts in diagnosing and treating disorders of the nervous system, including stroke, epilepsy, and multiple sclerosis. 
        </span></h5>
        <h5 className='font-semibold text-lg ml-3'>Approach:<span className='font-normal text-base ml-1'> Combining state-of-the-art technology with a patient-centred approach to manage and treat neurological conditions effectively.</span></h5>

        </div>
        </div>

    <div class="mt-6 text-base text-gray-500 sm:mt-8 sm:text-lg sm:max-w-xl md:mt-8 md:text-xl lg:mx-0">
            {/* <div class="mb-4 flex flex-row items-center gap-3 mt-[4.8vw]  ">
              <div className=''>
             <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADFSURBVHgBpZKxDcIwEEX/mQZRJRIDZIRsQChTsgEbhAmQRyAbsAGiSglskBE8AFIoafBhHw5KgYgRr0rse9aXvwmB7qATzCYV2BYg5GAkbrl9MNXzcrvHABKh0RmITu4zw2cMmJdpqY3/US/1qwDZczOSxkvXRq9HhLdop9iINCGqEIkiWvTxcsRT9NLPeOkcPU1oRbLMl2jJUi2SumMH38M4Jg0lq3Slb764EdGEmZByQOc7I7gKKNwot+45HeHSyOH/8AQtCjoWHv6pVwAAAABJRU5ErkJggg=='></img>
              </div>
                <p className=''>Doctors from across specialties under a single roof.</p>
            </div> */}

          <div className='flex flex-col justify-start items-start gap-3'>
        <h3 className='font-semibold text-lg text-customcolor'>Gastroenterologists</h3>
        <h5 className='font-semibold text-lg ml-3'>Expertise:<span className='font-normal text-base ml-1'>Focused on digestive health, our gastroenterologists treat conditions such as IBS, Crohn’s disease, and liver disorders. </span></h5>
        <h5 className='font-semibold text-lg ml-3'>Approach:<span className='font-normal text-base ml-1'>  Providing comprehensive evaluations and treatments to improve your digestive health and quality of life.
        </span></h5>

        </div>

        <div className='flex flex-col justify-start items-start mt-4 gap-3  '>
        <h3 className='font-semibold text-lg text-customcolor'>Endocrinologists</h3>
        <h5 className='font-semibold text-lg ml-3'>Expertise:<span className='font-normal text-base ml-1'>  Our endocrinologists specialising in hormone-related disorders, including diabetes, thyroid diseases, and metabolic conditions.
        </span></h5>
        <h5 className='font-semibold text-lg ml-3'>Approach:<span className='font-normal text-base ml-1'> Offering tailored treatment plans and ongoing support to manage your endocrine health effectively.</span></h5>

        </div>
        <div className='flex flex-col justify-start items-start mt-4 gap-3'>
        <h3 className='font-semibold text-lg text-customcolor'>Orthopaedic Surgeons</h3>
        <h5 className='font-semibold text-lg ml-3'>Expertise:<span className='font-normal text-base ml-1'>
        Specialising in musculoskeletal health, our orthopaedic surgeons treat conditions such as fractures, arthritis, and sports injuries.
 
        </span></h5>
        <h5 className='font-semibold text-lg ml-3'>Approach:<span className='font-normal text-base ml-1'> Using the latest surgical techniques and rehabilitation methods to help you regain mobility and strength.
        </span></h5>

        </div>
        </div>
    </div>

</div>

</section>



<div className="mt-[-2vw]">
        <div className="p-4 flex flex-col items-center">
          <div className="flex justify-center font-medium leading-[150%] mb-[4vw] mt-[2vw] uppercase text-customcolor lg:text-[35px]">
            Most searched medical conditions
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            {conditions1.map((condition, index) => (
              <div
                key={index}
                className="relative group bg-customcolor p-4 rounded-md flex-1 min-w-[200px] text-center"
              >
                {condition.name}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-40 p-2 bg-white text-black text-sm rounded-md shadow-lg z-10">
                  {condition.info}
                  <p ><span className='font-bold'>Symptoms:</span>{condition.symptoms}</p>

                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {conditions2.map((condition, index) => (
              <div
                key={index}
                className="relative group bg-customcolor p-4 rounded-md flex-1 min-w-[200px] text-center"
              >
                {condition.name}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-40 p-2 bg-white text-black text-sm rounded-md shadow-lg z-10">
                  {condition.info}
                  <p ><span className='font-bold'>Symptoms:</span>{condition.symptoms}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    <div className='mb-[8vw] mt-[4vw]'>
  <div className="flex justify-center  font-medium leading-[150%] mt-[2vw] uppercase text-customcolor  lg:text-[35px]">
    Consultation at Your Fingertip
  </div>
  <section className='p-8 md:p-16' style={{ background: "#f0f8ff" }}>
  <div className='text-center mb-8'>
    <h2 className='text-2xl lg:text-3xl font-bold'>How We Works:</h2>
  </div>
  <div className='flex flex-col lg:flex-row  justify-between gap-2 items-start'>
    {/* Item 1 */}
    <div className='flex items-start mb-4 w-full lg:w-1/2 p-2'>
      <div className='w-20 h-16 mr-2'>
        <img src={homeSamplePickup} alt="Home sample collection" />
      </div>
      <div>
        <p className='font-semibold text-lg'>Schedule an Appointment:</p>
        <h5 className='font-semibold text-lg ml-3'>Online Booking:<span className='font-normal text-base ml-1'>Easily book your consultation through our website at a time that suits you. Our system allows you to choose from multiple medical care facilities for your convenience. </span></h5>
      </div>
      
    </div>

    {/* Item 2 */}
    <div className='flex items-start mb-4 w-full lg:w-1/2 p-2'>
      <div className='w-20 h-16 mr-2'>
        <img src={e_reports} alt="Digital report" />
      </div>
      <div>
      <p className='font-semibold text-lg'>Visit Our Facility:</p>
      <h5 className='font-semibold text-lg ml-3'>In-Person Consultations:<span className='font-normal text-base ml-1'>Visit the selected facility for face-to-face consultations with our expert medical team. </span></h5>
      
      </div>
    </div>


 {/* Item 3 */}

    <div className='flex items-start mb-4 w-full lg:w-1/2 p-2'>
      <div className='w-20 h-16'>
        <img src={offers} alt="Offers and prices" />
      </div>
      <div>
        <p className='font-semibold text-lg'>
        Receive Personalised Care:
     </p>
     <h5 className='font-semibold text-lg ml-3'>Diagnosis and Treatment:<span className='font-normal text-base ml-1'>Get a detailed diagnosis and a personalised treatment plan tailored to your specific needs.</span></h5>
     </div>
    </div>
  </div>
</section>
</div>


      
      <section className="text-gray-700 body-font">
        <div className="flex justify-center mt-10 text-4xl font-regular text-customcolor">
          Why Us?
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap text-center justify-center">
            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img 
                    src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp" 
                    className="w-32 mb-3" 
                    alt="Quick Lab Reports" 
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Expert Medical Team</h2>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img 
                    src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp" 
                    className="w-32 mb-3" 
                    alt="Reasonable Rates" 
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Comprehensive Services</h2>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img 
                    src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp" 
                    className="w-32 mb-3" 
                    alt="Time Efficiency" 
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Personalised Care</h2>
              </div>
            </div>

            <div className="p-4 md:w-1/4 sm:w-1/2">
              <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                <div className="flex justify-center">
                  <img 
                    src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp" 
                    className="w-32 mb-3" 
                    alt="Expertise in Industry" 
                  />
                </div>
                <h2 className="title-font font-regular text-2xl text-gray-900">Convenient Online Booking</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Consultation;
