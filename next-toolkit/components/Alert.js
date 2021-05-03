import { ToastContainer, toast } from "react-toastify";

const Alert = ({ position = "bottom-center" }) => {
  return (
    <ToastContainer
      position={position}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Alert;
