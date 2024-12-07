import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo_white.png";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [isMobileNavActive, setMobileNavActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isQuizPage = location.pathname === "/quiz";

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setIsLoggedIn(false); // Update state
    navigate("/login"); // Redirect to login page
  };

  return (
    <header
      id="header"
      style={{
        backgroundColor: isQuizPage
          ? "#10058c"
          : isScrolled
          ? "#10058c"
          : "transparent",
      }}
      className={`header d-flex align-items-center fixed-top ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src={Logo} alt="Logo" />
        </a>

        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`}
        >
          <ul>
            <li>
              <a href="/" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="/boards">Boards</a>
            </li>
            <li>
              <a href="/#contact">Contact</a>
            </li>
            <li>
              <a href="/wishlist">
                <i className="bi bi-heart-fill fs-6"></i>
              </a>
            </li>
            {/* Dropdown for Profile/Account */}
            <li className="dropdown">
              <a
                href="#"
                className="dropdown-toggle"
                onClick={toggleDropdown}
              >
                <i className="bi bi-person" style={{fontSize:'1.35rem'}}></i>
              </a>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <a href="/profile" className="dropdown-item">
                          Profile
                        </a>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <a
                        href="/login"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Login
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile Navigation Toggle */}
          <button
            className="mobile-nav-toggle d-xl-none"
            onClick={() => setMobileNavActive((prevState) => !prevState)}
          >
            <i className={`bi ${isMobileNavActive ? "bi-x" : "bi-list"}`}></i>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;