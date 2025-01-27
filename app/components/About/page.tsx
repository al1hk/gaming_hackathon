import React from "react";
import Header from "../Header";

const AboutUs = () => {
  return (
    <div>
      <Header/>
    
    <div className="bg-black text-green-500 py-10">
      {/* Breadcrumb */}
      <div className="text-center">
        <p className="text-green-400">Home &gt; Pages &gt; About Us</p>
      </div>

      {/* Title */}
      <h1 className="text-center text-4xl font-bold my-4 text-white">About Us</h1>

      {/* Statistics */}
      <div className="flex justify-center gap-10 my-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">400+</h2>
          <p>Worldwide Delivery</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">200+</h2>
          <p>Gaming Products</p>
        </div>
      </div>

      {/* Section: Making History Together */}
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold text-green-400">Making History Together</h2>
        <p className="text-gray-300 mt-2">
          Gaming worldwide delivery, expert team members, and smooth gaming product
          quality provide the best customer experience and consistent growth.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Section 1 */}
        <div>
          <img
            src="https://gaming-workdo.myshopify.com/cdn/shop/files/about-info-img.png?v=1721795867"
            alt="Gaming headquarters"
            className="rounded-md w-full ml-4"
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-400 mt-24">
            Gaming Founded With Headquarters In Different Country
          </h3>
          <p className="text-gray-300 mt-2">
            Gaming with innovation and advancement provides cutting-edge technology,
            ensuring a better gaming experience for customers. We aim for seamless
            interaction and superior quality.
          </p>
        </div>

        {/* Section 2 */}
        <div className="md:order-2">
          <img
            src="https://gaming-workdo.myshopify.com/cdn/shop/files/about-info-img2.png?v=1721795867"
            alt="Expert team members"
            className="rounded-md w-full pr-7"
          />
        </div>
        <div className="md:order-1">
          <h3 className="text-3xl font-bold text-green-400 mt-24 ml-4">We Have Expert Team Members</h3>
          <p className="text-gray-300 mt-2 ml-4">
            Expert team members ensure the best gaming products and features.
            Collaborating with our experts, we deliver unmatched gaming quality and
            experience.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <img
            src="https://gaming-workdo.myshopify.com/cdn/shop/files/about-info-img3.png?v=1721795867"
            alt="Smooth gaming experience"
            className="rounded-md w-full ml-4"
          />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-400 mt-24">
            The Quality Of Our Products Is Smooth Gaming Experience
          </h3>
          <p className="text-gray-300 mt-2">
            With a focus on providing smooth gaming experiences, our products are
            designed for reliability and top-tier performance. Enjoy cutting-edge
            technology and excellence with our wide range of gaming items.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
