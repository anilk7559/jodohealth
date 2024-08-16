import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';


const ChartDashboard = () => {
  const chartOptions1 = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    }
  };


  const chartOptions2 = {
    chart: {
      type: 'line',
      height: 350
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Value'
      }
    }
  };


  const chartOptions3 = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: ['Blood Test', 'Scans', 'Cancer Test', 'Diabetes', 'Others'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };



  const [chartSeries1, setChartSeries1] = useState([
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 72, 68, 71]
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 100, 102, 92]
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 40, 55, 47]
    }
  ]);

  const [chartSeries2, setChartSeries2] = useState([
    {
      name: 'Series 1',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ]);

  const [chartSeries3, setChartSeries3] = useState([40, 25, 15, 10, 10]);

  // Example of updating data dynamically
  useEffect(() => {
    // Simulate fetching new data after some time (example)
    const interval = setInterval(() => {
      // Update chartSeries1 with new data
      const newData1 = chartSeries1.map(series => ({
        ...series,
        data: series.data.map(value => value + Math.floor(Math.random() * 10))
      }));
      setChartSeries1(newData1);

      // Update chartSeries2 with new data
      const newData2 = chartSeries2.map(series => ({
        ...series,
        data: series.data.map(value => value + Math.floor(Math.random() * 5))
      }));
      setChartSeries2(newData2);

      // Update chartSeries3 with new data
      const newData3 = chartSeries3.map(value => value + Math.floor(Math.random() * 5));
      setChartSeries3(newData3);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [chartSeries1, chartSeries2, chartSeries3]);


  return (
    <div className="bg-white-100 min-h-screen w-full">
      <div className="flex flex-col lg:flex-row pt-4 px-4 lg:px-10 pb-4 justify-center">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row  justify-center">
          <div className="bg-no-repeat  bg-cover bg-center border rounded-xl w-full mx-2 my-2 p-6">
          <div className=' flex w-[24%] lg:w-[24%%] md:w-[24%] sm:w-[15%]'>
            <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75 ">
                <svg className="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                    fill="currentColor"></path>
                  <path
                    d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                    fill="currentColor"></path>
                  <path
                    d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                    fill="currentColor"></path>
                  <path
                    d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                    fill="currentColor"></path>
                  <path
                    d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                    fill="currentColor"></path>
                  <path
                    d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                    fill="currentColor"></path>
                </svg>
              </div>
            </div>

              <p className="text-[1.5rem] leading-none text-indigo-900 uppercase mb-4">Total Lab <br /><strong className='text-[1rem] leading-none'>20003</strong></p>
              <a href="#" className=" text-xl text-black  hover:underline inline-block rounded-full mt-12 px-8 py-2"><strong>Lab Booking</strong></a>
            </div>
            <div className="bg-no-repeat  bg-cover bg-center border rounded-xl w-full mx-2 my-2 p-6">
            <div className=' flex w-[24%] lg:w-[24%%] md:w-[24%] sm:w-[15%] mb-[10px]'>
            <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75 ">
            <svg class="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                            fill="currentColor"></path>
                        <path
                            d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                            fill="currentColor"></path>
                        <path
                            d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                            fill="currentColor"></path>
                    </svg>
              </div>
            </div>
              <p className="text-[1.5rem] leading-none text-indigo-900 uppercase">Total Bookings<br /><strong className='text-[1rem] leading-none'>23000</strong></p>
              <a href="#" className=" text-xl text-black  hover:underline inline-block rounded-full mt-12 px-8 py-2"><strong>Bookings</strong></a>
            </div>
            <div className="bg-no-repeat  bg-cover bg-center border  rounded-xl w-full mx-2 my-2 p-6">
            <div className=' flex w-[24%] lg:w-[24%%] md:w-[24%] sm:w-[15%] mb-[10px] '>
            <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75 ">
            <svg class="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor"
                            stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
                        <path
                            d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                            stroke="currentColor" stroke-width="2"></path>
                    </svg>
              </div>
              </div>
              <p className="text-[1.5rem] leading-none text-indigo-900 uppercase">total user <br /><strong className='text-[1rem] leading-none'>212123</strong></p>
              <a href="#" className=" text-xl text-black  hover:underline inline-block rounded-full mt-12 px-8 py-2"><strong>See Total User</strong></a>
            </div>
            <div className="bg-no-repeat  bg-cover bg-center border  rounded-xl w-full mx-2 my-2 p-6">
            <div className=' flex w-[24%] lg:w-[24%%] md:w-[24%] sm:w-[15%] mb-[10px]'>
            <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75 ">
            <svg class="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor"
                            stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
                        <path
                            d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                            stroke="currentColor" stroke-width="2"></path>
                    </svg>
              </div>
              </div>
              <p className="text-[1.5rem] leading-none text-indigo-900 uppercase">Total Test <br /><strong className='text-[1rem] leading-none'>269693</strong></p>
              <a href="#" className=" text-xl text-black  hover:underline inline-block rounded-full mt-12 px-8 py-2"><strong> Test Booking</strong></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row  mt-6">
            <div className="bg-white rounded-xl shadow-lg md:w-1/2 my-2 md:my-0">
              <div className="mb-6 font-semibold text-xl leading-7 text-customblue">Total Revenue</div>
              <Chart options={chartOptions1} series={chartSeries1} type="bar" height="350" />
            </div>
            <div className="bg-white rounded-xl shadow-lg md:w-1/2 md:ml-6 my-2 md:my-0">
              <div className="mb-6 font-semibold text-xl leading-7 text-customblue">Visitor Insight</div>
              <Chart options={chartOptions2} series={chartSeries2} type="line" height="350" />
            </div>

            <div className="bg-white rounded-xl shadow-lg md:ml-6  md:w-1/2 my-2 md:my-0">
            <div className="mb-6 font-semibold text-xl leading-7 text-customblue">Test Usage</div>
            <Chart options={chartOptions3} series={chartSeries3} type="pie" height="350" />
          </div>
        </div>
        </div>
          </div>
        </div>
    
  );
}

export default ChartDashboard;
