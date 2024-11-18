/* eslint-disable react/prop-types */
import { useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export default function ContactUs() {
  const Navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8080/contact", {
        name,
        email,
        message,
      });

      setResponseMessage(response.data.message);
      handleSuccess(response.data.message);
      setName("");
      setEmail("");
      setMessage("");

      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.error
        : "An error occurred";
      setErrorMessage(errorMsg);
      handleError(errorMsg);
    }
  };

  return (
    <>
      <NavBar id="black" />
      <div className="h-[85vh] mt-[9%]">
        <div className="container">
          <div className="content">
            <div className="left-side">
              <div className="address details">
                <i className="fas fa-map-marker-alt"></i>
                <div className="topic">Address</div>
                <div className="text-one">Doorstep Donation</div>
                <div className="text-two">Bansilal Path ,Bibewadi 411048</div>
              </div>
              <div className="phone details">
                <i className="fas fa-phone-alt"></i>
                <div className="topic">Phone</div>
                <div className="text-one">+91 989314 5647</div>
                <div className="text-two">+91 876714 5678</div>
              </div>
              <div className="email details">
                <i className="fas fa-envelope"></i>
                <div className="topic">Email</div>
                <div className="text-one">Doorstepdonation@gmail.com</div>
              </div>
            </div>
            <div className="right-side">
              <div className="topic-text">CONTACT US</div>
              <p className="par">
                Any questions or remarks? Drop your email, and we will be sure
                to contact you.
              </p>

              {responseMessage && <p className="success">{responseMessage}</p>}
              {errorMessage && <p className="error">{errorMessage}</p>}

              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box-message">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Enter your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="button">
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
