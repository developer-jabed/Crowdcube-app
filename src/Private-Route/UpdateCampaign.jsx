import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateCampaign = () => {
  const updateData = useLoaderData();
 
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  console.log(updateData);

  // image validation
  const handleImageChange = (event) => {
    const url = event.target.value;
    if (isValidImageUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview("");
    }
  };

  // fetch update onclick

  const handleUpdateCampaign = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const photoUrl = form.photoUrl.value.trim();
    const name = form.name.value.trim();
    const type = form.type.value;
    const description = form.description.value.trim();
    const amount = form.amount.value.trim();
    const date = form.date.value;

    if (!photoUrl || !name || !type || !description || !amount || !date) {
      alert("All fields are required!");
      setLoading(false);
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Amount must be a valid positive number!");
      setLoading(false);
      return;
    }

    const updateCampaign = {
      photoUrl,
      name,
      type,
      description,
      amount: parsedAmount,
      date,
    };
    fetch('http://localhost:5000/campaign',{
      method: 'PUT',
      headers: {
        'content-type': 'aplication/json'
      },
      body: JSON.stringify(updateCampaign)
    })
    .then(res => res.json())
    .then((data) => {
      
    })
  };

  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-2xl rounded-2xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Add New Campaign
      </h2>

      <motion.form onSubmit={handleUpdateCampaign} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            defaultValue={updateData.photoUrl}
            placeholder="Enter image URL"
            className="mt-2 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange}
          />
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Campaign Name
          </label>
          <input
            type="text"
            name="titleName"
            defaultValue={updateData.titleName}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Campaign Type
          </label>
          <select
            name="type"
            defaultValue={updateData.type}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          >
            <option value="">Select Type</option>
            <option value="personal issue">Personal Issue</option>
            <option value="startup">Startup</option>
            <option value="business">Business</option>
            <option value="creative ideas">Creative Ideas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={updateData.description}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Donation Amount
          </label>
          <input
            type="number"
            name="amount"
            defaultValue={updateData.amount}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            name="date"
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Email
          </label>
          <input
            type="text"
            name="email"
            value={user.email}
            readOnly
            className="mt-2 w-full px-4 py-2 border rounded-xl bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            name="name"
            value={user.displayName}
            readOnly
            className="mt-2 w-full px-4 py-2 border rounded-xl bg-gray-100"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add Campaign"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default UpdateCampaign;
