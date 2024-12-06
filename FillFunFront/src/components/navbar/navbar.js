import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo_white.png";
import { useLocation } from "react-router-dom";

function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDeepDropdownOpen, setDeepDropdownOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const [isMobileNavActive, setMobileNavActive] = useState(false);

    const location = useLocation();
    const isQuizPage = location.pathname === '/quiz';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileNav = () => {
        setMobileNavActive((prevState) => !prevState);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setDropdownOpen((prevState) => !prevState);
    };

    const toggleDeepDropdown = (e) => {
        e.preventDefault();
        setDeepDropdownOpen((prevState) => !prevState);
    };

    return (
        <>

            <header
                id="header"
                style={{
                    backgroundColor: isQuizPage
                        ? '#10058c'
                        : isScrolled
                            ? '#10058c'
                            : 'transparent',
                }}
                className={`header d-flex align-items-center fixed-top ${isScrolled ? 'scrolled' : ''}`}
            >
                <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                    <a href="/" className="logo d-flex align-items-center">
                        <img src={Logo} alt="Logo" />
                    </a>

                    <nav id="navmenu" className={`navmenu ${isMobileNavActive ? 'mobile-nav-active' : ''}`}>
                        <ul>
                            <li>
                                <a href="/" className="active">Home</a>
                            </li>

                            {/* <li>
                                <a href="/#about">Profile</a>
                            </li>
                            */

                            }
                            <li>
                                <a href="/boards">Boards</a>
                            </li>
                            <li><a href="/#contact">Contact</a></li>
                            <li><a href="/wishlist"><i className="bi bi-heart-fill fs-6"></i></a></li>
                        </ul>
                        {/* Mobile Navigation Toggle */}
                        <button className="mobile-nav-toggle d-xl-none" onClick={toggleMobileNav}>
                            <i className={`bi ${isMobileNavActive ? 'bi-x' : 'bi-list'}`}></i>
                        </button>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Navbar;
