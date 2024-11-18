import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Authorisation/AuthProvider";

const ProfilePage = () => {
  const Navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, logout } =
    useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    mobile: "+91 9860126708",
    gender: "Male",
    membership: "Gold",
    joinDate: null,
    trainerName: "Jane Smith",
    profilePicture: null,
  });
  const [workouts, setWorkouts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // New state for pagination
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:8080/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    const fetchUserWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:8080/profile/workouts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data.workouts[0] || []);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProfileData();
    fetchUserWorkouts();
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const profilepic = localStorage.getItem("profilePicture");
  const fileName = profilepic ? profilepic.split("\\").pop() : null;

  const formattedDate = profileData?.joinDate
    ? new Date(profileData.joinDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "January 12, 2023";

  // Calculate pagination indices
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedWorkouts = workouts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < workouts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-20 flex bg-transparent p-6 flex-col lg:flex-row">
        {/* Left Section */}
        <div className="w-full lg:w-1/4 bg-slate-300 bg-opacity-80 shadow-md rounded-lg p-4 flex flex-col items-center mb-6 lg:mb-0">
          <img
            src={`http://localhost:8080/uploads/${fileName}`}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">
            {profileData?.name || "John Doe"}
          </h2>
          <p className="text-gray-500">Gym Member</p>
          <div className="mt-9 text-gray-700 space-y-3">
            <p>
              <span className="font-bold">Name:</span> {profileData?.name}
            </p>
            <p>
              <span className="font-bold">Mobile No:</span>{" "}
              {profileData?.mobile}
            </p>
            <p>
              <span className="font-bold">Gender:</span> {profileData?.gender}
            </p>
            <p>
              <span className="font-bold">Membership:</span>{" "}
              {profileData?.membership}
            </p>
            <p>
              <span className="font-bold">Join Date:</span> {formattedDate}
            </p>
            <p>
              <span className="font-bold">Trainer:</span>{" "}
              {profileData?.trainerName}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-10 bg-red-500 px-5 py-3 rounded-md text-white hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-3/4 lg:ml-6">
          {/* Upper Part */}
          <div className="bg-slate-300 bg-opacity-80 shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Details
            </h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <p className="text-gray-600 mt-2">
              Email: {profileData.email || "example@gmail.com"}
            </p>
            <p className="text-gray-600 mt-2">
              Phone No: {profileData.mobile || "+91 9860126708"}
            </p>
          </div>

          {/* Activity List */}
          <div className="shadow-md bg-slate-300 bg-opacity-80 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Activity List
            </h3>
            <ul className="list-none space-y-4 text-gray-700">
              {paginatedWorkouts.map((activity, index) => (
                <li
                  key={index}
                  className="bg-slate-100 p-4 rounded-md shadow-sm flex justify-between"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900">
                      {activity.exercise_name}
                    </h4>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-sm text-gray-600">
                      Duration: {activity.duration} minutes
                    </p>
                  </div>
                  <div className="flex-1 text-right">
                    {activity.burnt_calories && (
                      <p className="text-sm text-gray-600">
                        Calories Burned: {activity.burnt_calories}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={endIndex >= workouts.length}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
