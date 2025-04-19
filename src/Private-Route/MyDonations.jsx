import { useLoaderData } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyDonations = () => {
  const donations = useLoaderData();

  const { user } = useContext(AuthContext);

  // Filter donations based on logged-in user's email
  const userDonations = donations.filter(
    
    (donation) => donation.donorEmail === user?.email
  );

  return (
    <div className="mt-25 max-w-6xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 text-center text-green-700"
      >
        My Donations ({userDonations.length})
      </motion.h1>

      {userDonations.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-lg"
        >
          You haven’t made any donations yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userDonations.map((donation, index) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={donation.photoUrl}
                alt={donation.campaignName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-green-600 mb-2">
                  {donation.campaignName}
                </h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Donated:</span> $
                  {donation.donatedAmount}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(donation.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Type:</span> {donation.type}
                </p>
                <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                  {donation.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
