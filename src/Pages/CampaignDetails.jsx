import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";

const CampaignDetails = () => {
  const location = useLocation();
  const { _id } = useParams();
  const navigate = useNavigate();
    const { user} = useContext(AuthContext);
  const [campaign, setCampaign] = useState(location.state?.campaign || null);

  useEffect(() => {
    if (!campaign) {
      fetch(`http://localhost:5000/campaign/${_id}`)
        .then((res) => res.json())
        .then((data) => setCampaign(data))
        .catch((err) => console.error("Error fetching campaign:", err));
    }
  }, [_id, campaign]);

  // Donate function
  const handleDonate = () => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
      return;
    }

    const donationData = {
      campaignId: campaign._id,
      campaignName: campaign.name,
      donatedAmount: campaign.amount,
      donorEmail: user.email,
      donorName: user.name,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:5000/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    })
      .then((res) => res.json())
      // eslint-disable-next-line no-unused-vars
      .then((data) => {
        alert("Thank you for your donation!");
      })
      .catch((err) => console.error("Error donating:", err));
  };

  if (!campaign) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-lg font-semibold text-gray-500"
        >
          Loading campaign details...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-24"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-gray-900"
      >
        {campaign.name}
      </motion.h2>

      <motion.img
        src={campaign.photoUrl}
        alt={campaign.name}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full h-64 object-cover rounded-xl my-4 shadow-lg"
      />

      <p className="text-lg text-gray-700">{campaign.description}</p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold text-blue-600">${campaign.amount}</p>
        <p className="text-sm text-gray-500">Ends on: {campaign.date}</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDonate}
        className="mt-6 w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Donate Now
      </motion.button>
    </motion.div>
  );
};

export default CampaignDetails;
