import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/Navbar";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://fit-4-you-website-api.vercel.app/getUsersRoute",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sortedUsers = users.sort(
    (a, b) => new Date(a["Joining Date"]) - new Date(b["Joining Date"])
  );
  const displayedUsers = showAll ? sortedUsers : sortedUsers.slice(0, 7);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <>
      <NavBar id="black" />
      <div className="min-h-screen flex flex-col items-center mt-14 justify-center p-4">
        <h1 className="text-4xl font-bold font-sans mb-6 text-white text-center">
          Gym Users
        </h1>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="overflow-x-auto w-full max-w-6xl my-6">
            <table className="table-auto w-full bg-transparent shadow-md rounded-lg overflow-hidden border-separate border-spacing-y-2">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Gender</th>
                  <th className="px-6 py-3 text-left">Membership</th>
                  <th className="px-6 py-3 text-left">Trainer Allotted</th>
                  <th className="px-6 py-3 text-left">Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user, index) => {
                  const joiningDate = new Date(user["Joining Date"]);
                  const formattedDate = joiningDate.toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  const formattedTime = joiningDate.toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  );

                  return (
                    <tr
                      key={index}
                      className="border-white border-b bg-gray-50 bg-opacity-40 text-white hover:bg-opacity-60"
                    >
                      <td className="px-6 py-3">{user["User Name"]}</td>
                      <td className="px-6 py-3">{user.Email}</td>
                      <td className="px-6 py-3">{user.Gender}</td>
                      <td className="px-6 py-3">{user.Membership}</td>
                      <td className="px-6 py-3">{user["Trainer Allotted"]}</td>
                      <td className="px-6 py-3">{`${formattedDate} at ${formattedTime}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && (
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            onClick={toggleShowAll}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>
    </>
  );
};

export default UsersList;
