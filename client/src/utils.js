import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleSuccess = (msg) => {
  console.log(msg);
  toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const handleError = (msg) => {
  console.log(msg);
  toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
