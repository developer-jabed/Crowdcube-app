import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("https://crowdfund-cam.vercel.app/campaign");
        const data = await response.json();

        setCampaigns(data);
        console.log("User campaigns:", data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    if (user?.email) {
      fetchCampaigns();
    }
  }, [user]);

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl text-center font-bold mb-4">All Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Goal</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="text-center">
                <td className="border px-4 py-2">{campaign.date}</td>
                <td className="border px-4 py-2">{campaign.name}</td>
                <td className="border px-4 py-2">{campaign.type}</td>
                <td className="border px-4 py-2">${campaign.amount}</td>
                
                <td  className="border px-4 py-2">
                  <Link
                    to={`/campaign/${campaign._id}`}
                    state={{ campaign }}
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllCampaigns;
