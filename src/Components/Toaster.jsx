import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
    return <ToastContainer position="bottom-right" autoClose={3000} />;
}