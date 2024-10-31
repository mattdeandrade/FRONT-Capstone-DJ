import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";

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
      <nav className="nav">
        <NavLink to="/" className="Navbar1">
          <>DJ Stream - every DJ's dream!</>
        </NavLink>

        <NavLink to="/tracks" className="Navbar2">
          Tracks
        </NavLink>

        <NavLink to="/edit" className="Navbar3">
          Edit
        </NavLink>

        <NavLink to="/playlists" className="Navbar4">
          Playlists
        </NavLink>
      </nav>
    </header>
  );
}
export default Navbar;
