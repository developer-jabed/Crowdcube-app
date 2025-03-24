import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const UpdateCampaign = () => {
  const updateData = useLoaderData();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    photoUrl: "",
    titleName: "",
    type: "",
    description: "",
    amount: "",
    date: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize form with updateData when component mounts or updateData changes
  useEffect(() => {
    setFormData({
      photoUrl: updateData.photoUrl || "",
      titleName: updateData.titleName || "",
      type: updateData.type || "",
      description: updateData.description || "",
      amount: updateData.amount || "",
      date: updateData.date || "",
    });

    if (isValidImageUrl(updateData.photoUrl)) {
      setImagePreview(updateData.photoUrl);
    }
  }, [updateData]);

  // Validate image URL
  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "photoUrl") {
      if (isValidImageUrl(value)) {
        setImagePreview(value);
      } else {
        setImagePreview("");
      }
    }
  };

  // Handle form submission
  const handleUpdateCampaign = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { photoUrl, titleName, type, description, amount, date } = formData;

    if (!photoUrl || !titleName || !type || !description || !amount || !date) {
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
      titleName,
      name: user.displayName,
      type,
      description,
      amount: parsedAmount,
      date,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/campaign/${updateData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateCampaign),
        }
      );

      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Success",
          text: "Campaign updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto mt-20 p-6 bg-white shadow-2xl rounded-2xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Update Campaign
      </h2>

      <motion.form onSubmit={handleUpdateCampaign} className="space-y-6">
        {/* Photo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="mt-2 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
        )}

        {/* Campaign Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Campaign Name
          </label>
          <input
            type="text"
            name="titleName"
            value={formData.titleName}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          />
        </div>

        {/* Campaign Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Campaign Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          ></textarea>
        </div>

        {/* Minimum Donation Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Donation Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          />
        </div>

        {/* User Email */}
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

        {/* User Name */}
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

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Update Campaign"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default UpdateCampaign;
