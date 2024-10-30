import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

/** Main site navigation */
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const attemptLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header>
      <nav>
        <NavLink to="/" className="Navbar1">
          <>DJ Stream - every DJ's dream!</>
        </NavLink>

        <NavLink to="/tracks" className="Navbar2">
          Tracks
        </NavLink>
      </nav>
    </header>
  );
}
export default Navbar;
