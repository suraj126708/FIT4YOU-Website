import React from "react";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-3/4 md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()} // Prevent clicking the modal from closing
      >
        <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          suscipit magna sit amet lorem dignissim, eu auctor urna tincidunt. In
          nec massa id sapien auctor pretium sed non elit. Pellentesque at
          efficitur tortor. Etiam nec augue eget urna elementum placerat sit
          amet id felis. Donec vulputate quam dui, nec condimentum lorem gravida
          vel.
          <br />
          <br />
          {/* Add the long terms and conditions text here */}
        </p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
