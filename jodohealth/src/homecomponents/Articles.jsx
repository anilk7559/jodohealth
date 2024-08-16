import React from 'react'
import bloodtest from "../images/hand-with-protective-gloves-holding-blood-samples-covid-test.jpg";
import fitgirl from "../images/front-view-strong-woman-with-bicep.jpg";
import allergy from "../images/skillful-nurse-is-doing-blood-test-man-clinic-man-medical-mask.jpg";
const Articles = () => {
  return (
  <>
  <section className="py-8">
    <div className=" mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Read The Top Articles From Health Experts</h2>
            <p className="text-gray-700">These Articles will help you stay informed and reach your health goals.</p>
            {/* <button className="mt-6 inline-flex items-center px-6 py-3 text-white buttoncolor rounded-lg  focus:outline-none focus:ring-4 focus:ring-blue-300">
                See all articles
            </button> */}
        </div>
       
        <div className="flex flex-wrap -mx-4">
    <div className="w-full md:w-1/3 px-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
            <img className="w-full h-48 object-cover" src={bloodtest} alt="Article Image"/>
            <div className="p-6 flex-1">
                <h3 className="text-gray-800 text-lg font-semibold mb-2">Why Blood Tests Are Important for Diagnosing Dengue</h3>
                <p className="text-gray-600 text-sm font-medium mb-4">Dengue is a viral disease transmitted by mosquitoes, affecting individuals of all ages. Symptoms can vary from mild, such as high fever, headache, and body aches, to severe cases involving shock, bleeding, and organ complications. Blood tests play a key role in accurately diagnosing and managing dengue, ensuring timely and effective treatment.</p>
            </div>
        </div>
    </div>

    <div className="w-full md:w-1/3 px-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
            <img className="w-full h-48 object-cover" src={allergy} alt="Article Image"/>
            <div className="p-6 flex-1">
                <h3 className="text-gray-800 text-lg font-semibold mb-2">Exploring 6 Common Types of Allergies and Their Symptoms</h3>
                <p className="text-gray-600 text-sm mb-4 font-medium">Allergies are becoming a major health concern worldwide, and India is no exception, with over 25% of the population affected. Understanding the various types of allergies and their specific triggers is essential for effective management and improving your quality of life. This article will guide you through the six main types of allergies, highlighting their unique characteristics. Additionally, we encourage you to consider an allergy test package to better manage your symptoms and find relief.</p>
            </div>
        </div>
    </div>

    <div className="w-full md:w-1/3 px-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
            <img className="w-full h-48 object-cover" src={fitgirl} alt="Article Image"/>
            <div className="p-6 flex-1">
                <h3 className="text-gray-800 text-lg font-semibold mb-2">How Overall Health Impacts Your Immune System</h3>
                <p className="text-gray-600 text-sm mb-4 font-medium">Your immune system acts as your body's vigilant protector, defending against viruses, bacteria, and parasites. Maintaining overall health is vital for ensuring your immune system remains strong and effective. As we face increasing health challenges, understanding the crucial link between your overall health and immune function becomes essential. Comprehensive health checkups are key to uncovering potential issues, especially those affecting immune function. Early detection of these issues helps ensure your immune system operates at its best.</p>
            </div>
        </div>
    </div>
</div>

    </div>
</section>

  </>
  )
}

export default Articles