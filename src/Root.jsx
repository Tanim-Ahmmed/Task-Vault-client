import { Outlet } from "react-router-dom";
import Navbar from "./componants/Shared/Navbar";
import Footer from "./componants/Shared/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
