import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo_white.png";

function Navbar() {
    const [isMobileNavActive, setMobileNavActive] = useState(false);
    const [dropdownStates, setDropdownStates] = useState({});
    const location = useLocation();
    const isQuizPage = location.pathname === '/quiz';
    const isBoardPage = location.pathname === '/boards';
    const isWishlistPage = location.pathname === '/wishlist';
    const isContactPage = location.pathname === '/#contact';
    const isHomePage = location.pathname === '/';
    const [isScrolled, setScrolled] = useState(false);


    useEffect(() => {
        if (isMobileNavActive) {
            document.body.classList.add("mobile-nav-active");
        } else {
            document.body.classList.remove("mobile-nav-active");
        }
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


    }, [isMobileNavActive]);

    const toggleMobileNav = () => {
        setMobileNavActive((prev) => !prev);
    };

    const handleSamePageLinkClick = () => {
        if (isMobileNavActive) {
            toggleMobileNav();
        }
    };

    const toggleDropdown = (index) => {
        setDropdownStates((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <header
            id="header"
            style={{
                backgroundColor: isQuizPage
                    ? '#10058c'
                    : isScrolled
                        ? '#10058c'
                        : 'transparent',
            }}
            className="header d-flex align-items-center fixed-top"
        >
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <a href="/" className="logo d-flex align-items-center">
                    <img src={Logo} alt="Logo" />
                </a>

                <nav id="navmenu" className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`}>
                    <ul>
                        <li>
                            <a href="/" onClick={handleSamePageLinkClick} className="active">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/boards" onClick={handleSamePageLinkClick}>
                                Boards
                            </a>
                        </li>
                        <li>
                            <a href="/#contact" onClick={handleSamePageLinkClick}>
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/wishlist" onClick={handleSamePageLinkClick}>
                                <i className="bi bi-heart-fill fs-6"></i>
                            </a>
                        </li>

                    </ul>
                </nav>

                <button
                    className={`mobile-nav-toggle d-xl-none ${isMobileNavActive ? "bi-x" : "bi-list"}`}
                    onClick={toggleMobileNav}
                ></button>
            </div>
        </header>
    );
}

export default Navbar;