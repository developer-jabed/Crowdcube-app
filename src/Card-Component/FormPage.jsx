// FormPage.js
import { useState } from "react";
import { useHistory } from "react-router-dom";

const FormPage = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the backend (you can adjust this to your needs)
      const response = await fetch("/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit campaign");
      }

      const data = await response.json();
      console.log("Campaign created:", data);

      // After submitting, redirect to the homepage and pass data using history
      history.push({
        pathname: "/",
        state: { campaign: formData }, // Passing the form data to the homepage
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Campaign Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Campaign Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="goalAmount">Goal Amount</label>
          <input
            type="number"
            name="goalAmount"
            id="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Campaign</button>
      </form>
    </div>
  );
};

export default FormPage;
