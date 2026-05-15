import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);


  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };


  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        MyStore
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item ms-3">
                <button className="btn btn-outline-light" onClick={toggleTheme}>
                  {darkMode ? "Light" : "Dark"}
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>

            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
