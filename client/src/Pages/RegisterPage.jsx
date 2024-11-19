import React, { useState } from "react";
import NavBar from "../components/Navbar";
import InputField from "../components/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils.js";

// Utility functions
const RegistrationPage = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
    address: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!/^\d{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Contact Number must be 10 digits";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact Number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "You must agree to the terms";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      handleError(validationErrors);
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        "https://fit-4-you-website-api.vercel.app/auth/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      handleSuccess("Successfully registered!");
      setTimeout(() => {
        Navigate("/login");
      }, 1000);
    } catch (error) {
      const apiError = error.response?.data || error.message;
      handleError(apiError.message || "An error occurred during registration");
    }
  };

  return (
    <>
      <NavBar />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="max-w-3xl mx-auto mt-32 mb-4 p-8 bg-gray-100 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Gym Registration
        </h2>

        <InputField
          label="Full Name"
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <InputField
          label="Date of Birth"
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
        />

        <InputField
          label="Gender"
          type="select"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          error={errors.gender}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />

        <InputField
          label="Contact Number"
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          error={errors.contactNumber}
        />

        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Username"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <InputField
          label="Profile Picture (Optional)"
          type="file"
          id="profilePic"
          name="profilePic"
          onChange={handleChange}
          accept="image/*"
          error={errors.profilePic}
        />

        <InputField
          label="Address"
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="mr-2 bg-transparent"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label htmlFor="terms" className="text-sm font-medium text-gray-700">
            I agree to the{" "}
            <Popup
              trigger={
                <a className="underline text-blue-500">Terms and Conditions</a>
              }
              modal
              closeOnDocumentClick
              overlayStyle={{
                background: "rgba(0, 0, 0, 0.5)", // Dark background
              }}
              contentStyle={{
                width: "400px", // Custom width for the modal
                padding: "20px", // Padding inside the modal
                backgroundColor: "#fff", // White background for the modal
                borderRadius: "8px", // Rounded corners
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
              }}
            >
              {(close) => (
                <div className="flex flex-col items-center space-y-4">
                  <h2 className="text-xl font-bold mb-4">
                    Gym Terms and Conditions
                  </h2>
                  <p className="text-sm text-gray-700">
                    By registering for membership at [Gym Name], you agree to
                    the following terms and conditions:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>You must be at least 18 years old to register.</li>
                    <li>
                      Membership is non-transferable and can only be used by the
                      registered member.
                    </li>
                    <li>
                      The gym is not responsible for any injuries sustained
                      during workout sessions.
                    </li>
                    <li>
                      You are responsible for maintaining the confidentiality of
                      your membership details and access credentials.
                    </li>
                    <li>
                      The gym reserves the right to revoke membership for
                      inappropriate conduct or violation of the gym’s rules.
                    </li>
                    <li>
                      Membership fees are non-refundable and must be paid on
                      time to avoid interruption of services.
                    </li>
                  </ul>
                  <button
                    onClick={close}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                  >
                    Close
                  </button>
                </div>
              )}
            </Popup>
            <span> and agree to receive notifications.</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-500 text-white rounded-lg mb-6"
        >
          Register
        </button>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegistrationPage;
