import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { handleSuccess, handleError } from "../utils";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError({ apiError: "New passwords do not match" });
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const requestData = {
        email,
        oldPassword,
        newPassword,
      };

      const response = await fetch(
        "http://localhost:8080/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        handleSuccess(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError({ apiError: "Failed to reset password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center mt-5">
        <div className="bg-gray-100 p-16 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Change Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-2 border bg-transparent font-semibold border-black rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-transparent w-full p-2 mt-2 border font-semibold border-black rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-transparent w-full p-2 mt-2 border font-semibold border-black rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-transparent w-full p-2 mt-2 border font-semibold border-black rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error.apiError}</p>}

            <button
              type="submit"
              className={`w-full py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Change Password"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-2">
            Remembered your password?{" "}
            <a href="/login" className="text-blue-900 underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
