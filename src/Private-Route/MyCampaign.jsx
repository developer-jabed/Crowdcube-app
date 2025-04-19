import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("https://crowdfund-cam.vercel.app/campaign");
        const data = await response.json();

        const userCampaigns = data.filter((campaign) => {
          return campaign?.email === user.email;
        });

        setCampaigns(userCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.email]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://crowdfund-cam.vercel.app/campaign/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json()) // <-- Fixed here
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              // Remove deleted campaign from state
              setCampaigns((prev) => prev.filter((c) => c._id !== _id));
            }
          })
          .catch((error) => {
            console.error("Delete request failed:", error);
            Swal.fire("Error!", "Failed to delete campaign.", "error");
          });
      }
    });
  };

  return (
    <div className="container mt-20 mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-4">My Campaigns</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Goal</th>
              <th className="border px-4 py-2">End Campaign</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="text-center">
                <td className="border px-4 py-2">{campaign.type}</td>
                <td className="border px-4 py-2">${campaign.amount}</td>
                <td className="border px-4 py-2">{campaign.date}</td>

                <td className="border px-4 py-2">
                  <button
                  onClick={() => navigate(`/updateCampaign/${campaign._id}`)}  // <-- no hyphen

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
