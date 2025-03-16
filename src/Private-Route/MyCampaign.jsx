import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const MyCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/campaign");
        const data = await response.json();

        // Filter campaigns by user email
        const userCampaigns = data.filter(
          (campaign) => campaign.creatorName === user?.name
        );

        setCampaigns(userCampaigns);
        console.log("User campaigns:", userCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    if (user?.email) {
      fetchCampaigns();
    }
  }, [user?.name]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:5000/campaigns/${id}`, {
          method: "DELETE",
          credentials: "include", // Include cookies for authentication
        });
        setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Goal</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="text-center">
                <td className="border px-4 py-2">{campaign.name}</td>
                <td className="border px-4 py-2">{campaign.type}</td>
                <td className="border px-4 py-2">${campaign.amount}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/update-campaign/${campaign._id}`)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(campaign._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCampaign;
