import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

// Optional: Define DataWithResponseInit class
class DataWithResponseInit {
  constructor(data, init) {
    this.data = data;
    this.status = init?.status || 200;
  }
}

// Optional: Define custom data() wrapper function
function data(data2, init) {
  return new DataWithResponseInit(
    data2,
    typeof init === "number" ? { status: init } : init
  );
}

const CampaignDetails = () => {
  const location = useLocation();
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [campaign, setCampaign] = useState(location.state?.campaign || null);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    if (!campaign) {
      fetch(`http://localhost:5000/campaign/${_id}`)
        .then((res) => res.json())
        .then((data) => setCampaign(data))
        .catch((err) => console.error("Error fetching campaign:", err));
    }
  }, [_id, campaign]);

  const handleDonate = () => {
    if (!user) {
      Swal.fire("Login Required", "Please log in to donate.", "info");
      navigate("/login");
      return;
    }

    const amount = parseFloat(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      Swal.fire("Invalid Amount", "Please enter a valid donation amount.", "warning");
      return;
    }

    const donationData = {
      campaignId: campaign._id,
      campaignName: campaign.name,
      donatedAmount: amount,
      donorEmail: user.email,
      donorName: user.displayName || user.email,
      date: new Date().toISOString(),
      photoUrl: campaign.photoUrl,
      type: campaign.type,
      description: campaign.description,
    };

    fetch("http://localhost:5000/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    })
      .then((res) => res.json().then((json) => ({ status: res.status, json })))
      .then(({ status, json }) => {
        const wrapped = data(json, status); // Use custom data wrapper
        console.log("Donation Response:", wrapped);
        Swal.fire("Thank You!", "Your donation was successful.", "success");
        setDonationAmount(""); // Reset input
      })
      .catch((error) => {
        console.error("Donation error:", error);
        Swal.fire("Error", "Something went wrong with the donation.", "error");
      });
  };

  if (!campaign) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
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
        <p className="text-lg font-semibold text-blue-600">
          Goal: ${campaign.amount}
        </p>
        <p className="text-sm text-gray-500">Ends on: {campaign.date}</p>
      </div>

      <div className="mt-6">
        <input
          type="number"
          min="1"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDonate}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Donate Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CampaignDetails;
