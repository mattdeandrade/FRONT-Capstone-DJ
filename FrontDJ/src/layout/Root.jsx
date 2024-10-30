import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
//import { Footer } from "./footer";

/** Root layout component */
function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Root;
