import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const UpdateCampaign = () => {
  const campaign = useLoaderData();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext); // assuming you have loading

  // Show loading state
  if (loading) return <div>Loading...</div>;

  // If user is still null after loading, redirect or show error
  if (!user) {
    return <div className="text-center text-red-500">User not logged in.</div>;
  }

  const [formData, setFormData] = useState({
    title: campaign?.title || "",
    type: campaign?.type || "",
    amount: campaign?.amount || "",
    date: campaign?.date || "",
    description: campaign?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/campaign/${campaign._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        email: user.email,
        name: user.displayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success!", "Campaign updated successfully.", "success");
          navigate("/my-campaign");
        } else {
          Swal.fire("No Changes", "No data was updated.", "info");
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Category/Type"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Goal Amount"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full p-2 border bg-gray-100 rounded"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full p-2 border bg-gray-100 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
