import React, { useState, useEffect } from "react";
import Logo from "../../assets/logo_white.png";

function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDeepDropdownOpen, setDeepDropdownOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const [isMobileNavActive, setMobileNavActive] = useState(false);

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
        <header
            id="header"
            style={isScrolled ? { backgroundColor: '#10058c' } : { backgroundColor: 'transparent' }}
            className={`header d-flex align-items-center fixed-top ${isScrolled ? 'scrolled' : ''}`}
        >
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <a href="/" className="logo d-flex align-items-center">
                    <img src={Logo} alt="Logo" />
                </a>

                <nav id="navmenu" className={`navmenu ${isMobileNavActive ? 'mobile-nav-active' : ''}`}>
                    <ul>
                        <li><a href="/" className="active">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li className={`dropdown ${isDropdownOpen ? 'dropdown-active' : ''}`}>
                            <a href="#" onClick={toggleDropdown}>Categories <i className="bi bi-chevron-down"></i></a>
                            <ul>
                                <li><a href="#category1">Category 1</a></li>
                                <li className={`dropdown ${isDeepDropdownOpen ? 'dropdown-active' : ''}`}>
                                    <a href="#" onClick={toggleDeepDropdown}>Sub-Category <i className="bi bi-chevron-right"></i></a>
                                    <ul>
                                        <li><a href="#subcategory1">Sub-Category 1</a></li>
                                        <li><a href="#subcategory2">Sub-Category 2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><a href="/boards">Boards</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>

                <button className="mobile-nav-toggle d-xl-none" onClick={toggleMobileNav}>
                    <i className={`bi ${isMobileNavActive ? 'bi-x' : 'bi-list'}`}></i>
                </button>
            </div>
        </header>
    );
}

export default Navbar;
