// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

export default function AddCampaign() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { user } = useContext(AuthContext);
  console.log(user);
  const handleAddCampaign = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const photoUrl = form.photoUrl?.value?.trim() || "";

    const type = form.type?.value || "";
    const description = form.description?.value?.trim() || "";
    const amount = form.amount?.value?.trim() || "";
    const email = form.email?.value?.trim() || "";
    const displayName = form.displayName?.value?.trim() || "";
    const date = form.date?.value || "";

    if (!photoUrl || !type || !description || !amount || !date) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      setLoading(false);
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Amount must be a valid positive number!",
      });
      setLoading(false);
      return;
    }

    const newCampaign = {
      photoUrl,

      type,
      description,
      amount: parsedAmount,
      date,
      email,
      displayName,
    };

    try {
      const response = await fetch("https://crowdfund-cam.vercel.app/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add campaign");
      }

      Swal.fire({
        title: "Success",
        text: "Campaign Added successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      form.reset();
      setImagePreview("");
    } catch (error) {
      console.error("❌ Error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (event) => {
    const url = event.target.value;
    if (await isValidImageUrl(url)) {
      setImagePreview(url);
    } else {
      setImagePreview("");
    }
  };

  const isValidImageUrl = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return (
        response.ok && response.headers.get("content-type")?.includes("image")
      );
    } catch {
      return false;
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
        Add New Campaign
      </h2>

      <motion.form onSubmit={handleAddCampaign} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
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
            Campaign Type
          </label>
          <select
            name="type"
            className="mt-2 w-full px-4 py-2 border rounded-xl"
            required
          >
            <option value="">Select Type</option>
            <option value="personal issue">Personal Issue</option>
            <option value="education">Education</option>
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
            name="displayName"
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
}
