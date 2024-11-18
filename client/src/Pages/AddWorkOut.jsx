import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { handleError } from "../utils";

const WorkoutForm = () => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [burntCalories, setBurntCalories] = useState("");
  const [description, setDescription] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const exerciseList = [
    "Push-ups",
    "Sit-ups",
    "Running",
    "Cycling",
    "Jumping Jacks",
    "Plank",
    "Squats",
    "Lunges",
    "Burpees",
    "Mountain Climbers",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setErrorMessage("");

    // Validate duration and burnt calories
    if (duration > 300) {
      return handleError("Duration cannot exceed 300 minutes.");
    }

    if (burntCalories > 2000) {
      return handleError("Burnt calories cannot exceed 2000 calories.");
    }

    if (exercise && duration && burntCalories) {
      const workoutData = {
        exercise_name: exercise,
        duration: parseInt(duration),
        burnt_calories: parseInt(burntCalories),
        description: description || null,
      };

      try {
        const response = await fetch("http://localhost:8080/addWorkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(workoutData),
        });

        if (response.ok) {
          // Clear form fields on successful submission
          setExercise("");
          setDuration("");
          setBurntCalories("");
          setDescription("");
          setSuccessPopup(true);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Failed to add workout.");
        }
      } catch (error) {
        handleError("Error sending workout data:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  const handleGoHome = () => {
    setSuccessPopup(false);
    navigate("/");
  };

  const handleExerciseChange = (e) => {
    const input = e.target.value;
    setExercise(input);

    if (input) {
      const filteredSuggestions = exerciseList.filter((exercise) =>
        exercise.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleExerciseSelect = (suggestion) => {
    setExercise(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen mt-20 text-white flex flex-col">
      <NavBar />
      <div className="flex-grow p-6 flex flex-col items-center">
        <h1 className="text-3xl font-sans font-semibold mb-8">
          Log Today's Workout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Exercise Name
            </label>
            <input
              type="text"
              value={exercise}
              onChange={handleExerciseChange}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Push-ups"
              required
            />
            {/* Display suggestions */}
            {suggestions.length > 0 && (
              <ul className="bg-gray-700 text-white mt-2 p-2 rounded-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-blue-600"
                    onClick={() => handleExerciseSelect(suggestion)} // Select exercise from list
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Duration (in minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. 30"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Burnt Calories
            </label>
            <input
              type="number"
              value={burntCalories}
              onChange={(e) => setBurntCalories(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. 250"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Completed 3 sets of push-ups"
              rows="3"
            />
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add Workout
          </button>
        </form>

        {/* Success Popup */}
        {successPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">
                Workout Added Successfully!
              </h2>
              <button
                onClick={handleGoHome}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Go to Home Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutForm;
