import React from 'react'

const LocationSection = () => {
  return (
    <>
      <div className="locationsection-main-div space-x-2" >
          <div className="py-2 ">
            <label
              for="search"
              className="text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 2a6 6 0 00-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 00-6-6zM10 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300  bg-white-50  dark:placeholder-gray-400 dark:text-white  "
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="py-1 ">
          <button className='search-button'>Search</button>
     
          </div>
        </div>
    </>
  )
}

export default LocationSection