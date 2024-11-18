import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/Navbar";
import { handleError, handleSuccess } from "../utils.js";

const UsersQuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/faqRoute", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestions(response.data.data || []); // Only unanswered questions will be fetched
        setLoading(false);
      } catch (err) {
        handleError("Failed to fetch questions. Please try again later.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  console.log(questions);

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleAnswerSubmit = async (id) => {
    if (!answers[id]) {
      handleError("Please enter an answer before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/faqRoute/answer`,
        {
          questionId: id,
          answer: answers[id],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        handleSuccess("Answer submitted and question marked as answered!");

        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== id)
        );

        setAnswers((prev) => ({ ...prev, [id]: "" }));
      }
    } catch (err) {
      console.error("Failed to submit answer:", err);
      handleError("Failed to submit answer. Please try again later.");
    }
  };

  return (
    <>
      <NavBar id="black" />
      <div className="min-h-screen flex flex-col items-center mt-14 justify-center p-4">
        <h1 className="text-4xl font-bold font-sans mb-6 text-white text-center">
          User Questions
        </h1>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : questions.length === 0 ? ( // Check if there are no questions
          <p className="text-white text-center">
            No questions available at the moment.
          </p> // Display message when no questions
        ) : (
          <div className="overflow-x-auto w-full max-w-6xl my-6">
            <table className="table-auto w-full bg-transparent shadow-md rounded-lg overflow-hidden border-separate border-spacing-y-2">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Message</th>
                  <th className="px-6 py-3 text-left">Answer</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr
                    key={question.id}
                    className="border-white border-b bg-gray-50 bg-opacity-40 text-white hover:bg-opacity-60"
                  >
                    <td className="px-6 py-3">{question.name}</td>
                    <td className="px-6 py-3">{question.email}</td>
                    <td className="px-6 py-3">{question.message}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            handleInputChange(question.id, e.target.value)
                          }
                          placeholder="Enter your answer"
                          className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none text-black"
                        />
                        <button
                          onClick={() => handleAnswerSubmit(question.id)}
                          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersQuestionsList;
