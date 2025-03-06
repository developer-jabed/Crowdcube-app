import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FaHandHoldingHeart, FaRegLightbulb, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const images = [
    "/src/assets/slide1.jpg",
    "/src/assets/slide2.jpg",
    "/src/assets/slide3.jpg",
  ];
  const { state } = useLocation();
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState(null);

  useEffect(() => {
    // Fetch campaigns from the backend (just like before)
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  // If there's new campaign data passed via state, set it
  useEffect(() => {
    if (state?.campaign) {
      setNewCampaign(state.campaign);
    }
  }, [state]);

  return (
    <div>
      <div className="home-page">
        {/* Banner/Slider */}
        <section className="banner-slider mt-10">
          <div className="slide-container">
            <Zoom scale={0.4} autoplay={true}>
              {images.map((image, index) => (
                <div key={index} className="relative h-[500px]">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">
                      Welcome to Our Platform!
                    </h2>
                    <p className="text-xl mb-6">
                      Join the cause, make a difference. Every contribution
                      counts.
                    </p>
                    <button className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </Zoom>
          </div>
        </section>

        {/* Running Campaigns Section */}
        <div>
          <h2>Running Campaigns</h2>

          {/* Show new campaign data if available */}
          {newCampaign && (
            <div>
              <h3>New Campaign Submitted</h3>
              <p>Title: {newCampaign.title}</p>
              <p>Description: {newCampaign.description}</p>
              <p>Goal: ${newCampaign.goalAmount}</p>
              <p>
                End Date: {new Date(newCampaign.endDate).toLocaleDateString()}
              </p>
            </div>
          )}

          <div>
            <h3>All Campaigns</h3>
            {campaigns.map((campaign, index) => (
              <div key={index}>
                <h4>{campaign.title}</h4>
                <p>{campaign.description}</p>
                <p>Goal: ${campaign.goalAmount}</p>
                <p>
                  End Date: {new Date(campaign.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fancy Section 1 - Why Choose Us */}
        <section className="why-choose-us bg-gradient-to-r from-purple-600 py-16">
          <div className="container mx-auto text-center text-white">
            {/* Title */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-10"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Why Choose Us?
            </motion.h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Feature 1 - Support a Cause */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <FaHandHoldingHeart className="text-5xl text-blue-600 mb-6 transform hover:rotate-12 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4">Support a Cause</h3>
                <p className="text-lg text-gray-700">
                  Your contribution can make a real impact on a cause that
                  matters.
                </p>
              </motion.div>

              {/* Feature 2 - Innovative Ideas */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <FaRegLightbulb className="text-5xl text-yellow-500 mb-6 transform hover:rotate-12 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4">
                  Innovative Ideas
                </h3>
                <p className="text-lg text-gray-700">
                  We bring new and creative ways to bring awareness to the
                  causes.
                </p>
              </motion.div>

              {/* Feature 3 - Community Engagement */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                <FaUsers className="text-5xl text-green-600 mb-6 transform hover:rotate-12 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4">
                  Community Engagement
                </h3>
                <p className="text-lg text-gray-700">
                  Join a supportive community working together for a greater
                  cause.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Fancy Section 2 - Our Mission */}
        <section className="our-mission bg-gradient-to-r from-blue-500 to-indigo-60 py-16 md:py-24 lg:py-32">
          <div className="container mx-auto text-center text-white">
            {/* Title */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Our Mission
            </motion.h2>

            {/* Main Description */}
            <motion.p
              className="text-lg sm:text-xl mb-8 font-light"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              At <span className="font-semibold">[Your Platform Name]</span>,
              our mission is to ignite positive change across the globe by
              connecting passionate individuals with meaningful causes. We
              believe every small action counts and that collectively, we can
              create a lasting, impactful difference.
            </motion.p>

            {/* Key Components - Empowering Change-Makers */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="flex flex-col items-center max-w-xs p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <FaHandHoldingHeart className="text-4xl text-indigo-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Empowering Change-Makers
                </h3>
                <p className="text-center text-lg text-gray-700">
                  We equip individuals and organizations with the tools to
                  create a better world by raising awareness and funds for
                  impactful causes.
                </p>
              </div>

              <div className="flex flex-col items-center max-w-xs p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <FaUsers className="text-4xl text-indigo-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Community & Collaboration
                </h3>
                <p className="text-center text-lg text-gray-700">
                  By connecting like-minded individuals, we build a global
                  community dedicated to supporting each other's missions for
                  lasting change.
                </p>
              </div>
            </motion.div>

            {/* Focus on Transparency and Sustainability */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <div className="flex flex-col items-center max-w-xs p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <FaRegLightbulb className="text-4xl text-indigo-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Transparency & Accountability
                </h3>
                <p className="text-center text-lg text-gray-700">
                  We ensure that every donation is tracked with full
                  transparency, so you can see the real impact your contribution
                  is making.
                </p>
              </div>

              <div className="flex flex-col items-center max-w-xs p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <FaRegLightbulb className="text-4xl text-indigo-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Sustainability at Heart
                </h3>
                <p className="text-center text-lg text-gray-700">
                  Our campaigns are designed with long-term sustainability in
                  mind, ensuring that the impact lasts for years to come.
                </p>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.button
              className="bg-indigo-600 hover:bg-amber-400 text-white font-bold py-3 px-8 rounded-lg text-xl mt-6 transform hover:scale-105 transition-all duration-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Get Involved Now
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
