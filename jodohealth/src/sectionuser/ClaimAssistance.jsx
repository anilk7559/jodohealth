import React from 'react'
import Header from '../homecomponents/Header'
import Footer from '../homecomponents/Footer'
const ClaimAssistance = () => {
  return (
    <>
      <Header />
      <section className=" relative text-center text-black">
        <img src="https://www.libertyinsurance.in/images/claim-registration-banner.jpg" alt="Snow" className='w-full h-96' />
        <div className=" absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-blue-500">Easy Health Insurance Claim Help | Jodo Health</div>
      </section>

      <section className='p-8  md:p-16 bg-[#F8F8F8]'>
        <div className='text-center '>
          <h2 className='text-2xl lg:text-3xl font-bold'>How We Assist You</h2>
          <p className='p-5 text-lg font-medium'>At Jodo Health, our Claim Assistance services are designed to make the insurance claim process as smooth and straightforward as possible. Here’s how we help:</p>
          <div className='flex flex-col  gap-4 '>
        <div className='flex flex-col justify-start items-start'>
        <h3 className='font-semibold text-lg'>Provide Step-by-Step Guidance</h3>
        <p className='font-normal text-base'>We guide you through each stage of the insurance claim process, from understanding your coverage to filing your claim.</p>
        </div>

        <div className='flex flex-col justify-start items-start'>
        <h3 className='font-semibold text-lg'>Assist with Documentation</h3>
        <p className='font-normal text-base'>Our team helps you gather and organise all necessary documents to ensure your claim is complete and accurate.</p>
        </div>

        <div className='flex flex-col justify-start items-start'>
        <h3 className='font-semibold text-lg'>Handle Claim Submission</h3>
        <p className='font-normal text-base'>We manage the submission of your insurance claim, ensuring it is filed correctly and promptly.</p>
        </div>

        <div className='flex flex-col justify-start items-start'>
        <h3 className='font-semibold text-lg'>Follow Up on Claims</h3>
        <p className='font-normal text-base'>We monitor the progress of your claim and follow up with your insurance provider to address any issues that may arise.</p>
        </div>

        <div className='flex flex-col justify-start items-start'>
        <h3 className='font-semibold text-lg'>Resolve Claim Issues</h3>
        <p className='font-normal text-base'>If there are any problems or delays with your claim, we work to resolve them quickly and effectively.</p>
        </div>

          </div>
        </div>
      </section>

      <section className='p-8 md:p-16 bg-white'>
        <div className='text-center '>
          <h2 className='text-2xl lg:text-3xl font-bold'>Need Assistance?</h2>
          <p className='p-8 text-lg font-medium'>Our team of in-house experts is here to help with any claims or support you may need.</p>
        </div>
        <div className='flex flex-col lg:flex-row  justify-start items-start mx-12'>
          {/* Item 1 */}
          <div className=" text-center mb-4 w-full lg:w-1/2 p-2 flex flex-col items-center">
            <div className="w-26 h-auto mb-2 flex items-center justify-center">
              <img src="https://claimbuddy.in/images/img9.png" alt="Home sample collection" />
            </div>
            <div>
              <p className="font-semibold text-lg">Share case details</p>
              <p className="font-normal text-base">Share your claim details with our Jodo Health present at the respective hospital desk or email us the same at jodo@jodohealth.in.</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="text-center mb-4 w-full lg:w-1/2 p-2 flex flex-col items-center">
            <div className="w-26 h-auto mb-2 flex items-center justify-center">
              <img src="https://claimbuddy.in/images/img10.png" alt="Home sample collection" />
            </div>
            <div>
              <p className="font-semibold text-lg">File claim with expert assistance
              </p>
              <p className="font-normal">We will assist you with the eligibility of your claim as well as help you to file the claim by arranging sufficient and right set of documents.</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="text-center mb-4 w-full lg:w-1/2 p-2 flex flex-col items-center">
            <div className="w-26 h-auto mb-2 flex items-center justify-center">
              <img src="https://claimbuddy.in/images/img11.png" alt="Home sample collection" />
            </div>
            <div>
              <p className="font-semibold text-lg">Get paid maximum money</p>
              <p className="font-normal">We ensure that you never lose the money that your insurance company owes you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className=" px-4 py-6 md:py-12 bg-[#F8F8F8]">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-bold text-black text-center text-3xl  max-w-2xl mx-auto mb-4">Testimonials</h2>
          <h2 className="font-medium text-gray-600 text-center text-lg  max-w-2xl mx-auto mb-12">What Our Patients And Hospitals Say About Us</h2>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 relative">
            <div className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3">
              <p className="font-bold uppercase">John Doe</p>
              <p className="text-xl font-normal italic text-gray-700">Sureclaim assisted me in the most critical moments during my wife delivery phase</p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3">
              <p className="font-bold uppercase">Jane Smith</p>
              <p className="text-xl font-normal italic text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores.</p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-8 text-center md:w-1/3">
              <p className="font-bold uppercase">Emily Johnson</p>
              <p className="text-xl font-normal italic text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, tempore possimus velit fugiat alias aspernatur modi rerum omnis nesciunt excepturi. Animi, eos?</p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
                <svg className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" stroke="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                  </path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="flex justify-center px-2 my-6" style={{ background: "#f0f8ff" }}>
        <div className="max-w-2xl px-3 py-5 rounded-2xl md:px-8 md:py-7">
          <h4 className="text-2xl font-bold tracking-wide text-black lg:text-3xl text-center">[Get Assistance]</h4>
          <p className="max-w-xl mt-2 leading-relaxed text-gray-600 lg:text-lg text-center">
            With our expert in house perssonnel we can help you with in any claim assistance needed.
          </p>
          <div className="my-4 sm:flex sm:flex-row sm:justify-evenly">
            <input className=" block w-full px-4 py-3 mt-3 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none sm:max-w-xs focus:outline-none focus:ring focus:ring-blue-50 focus:border-blue-300" type="email" placeholder="Enter your email address here" value="" />
            <button className="bg-blue-600 hover:bg-blue-200 block w-full py-3 mt-3 font-bold tracking-wide rounded shadow sm:ml-3 md:w-52 text-white focus">
              <span className="block ">Assist me </span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ClaimAssistance