import React from 'react'
import looka from '../images/looka.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="footersection-main-div">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 flex items-center">
              <a href="https://flowbite.com/" className="flex items-center">
                <img src={looka} alt="FlowBite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start">
              <div className="flex items-center space-x-8">
                <ul className="flex space-x-4 text-black font-medium">
                  <li>
                    <Link to="/aboutus">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contactus">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/user/privacypolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/user/term&condition">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div style={{ textAlign: "center" }}>Copyright © 2024 JodoHealth</div>
    </>
  )
}

export default Footer
