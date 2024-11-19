import React, { useEffect, useState } from "react";

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("https://fit-4-you-website-api.vercel.app/getTeamDetailsRoute")
      .then((response) => response.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error("Error fetching team data:", error));
  }, []);

  return (
    <div className="max-w-7xl mt-14 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-12 sm:mb-20">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 bg-neutral-800 p-6 rounded-lg shadow-lg"
          >
            <img
              className="w-40 h-40 rounded-full object-cover border-4 border-neutral-600"
              src={`https://fit-4-you-website-api.vercel.app/${member.profile_pic}`}
              alt={member.name}
            />
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-medium text-white">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                {member.position}
              </p>
              <p className="mt-2 text-sm sm:text-base text-slate-300">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
