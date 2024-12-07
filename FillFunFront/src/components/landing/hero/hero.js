import React from "react";

import HeroImage from "../../../assets/img/hero-bg-2.jpg";
import Hero2 from "../../../assets/img/header.webp";


function Hero() {


    return (
        <section id="hero" className="hero section dark-background"style={{ paddingTop: "190px", paddingBottom: "190px" }}>
            <img src={HeroImage} alt="Hero image" className="hero-bg" />

            <div className="container">
                <div className="row gy-4 justify-content-between">
                    <div className="col-lg-4 order-lg-last hero-img" data-aos="zoom-out" data-aos-delay="100">

                        <img src={Hero2} className="img-fluid animated" alt="Hero Illustration" />
                    </div>

                    {/* Hero Text Content */}
                    <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-in">
                        <h1>
                            Fill Fun -Where knowledge meets fun
                        </h1>
                        <p>Dive into a world of trivia surprises!</p>
                        <div className="d-flex">
                            {/* CTA Buttons */}
                            <a href="/boards" className="btn-get-started">
                                Get Started
                            </a>

                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Waves SVG */}
            <svg
                className="hero-waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
            >
                <defs>
                    <path
                        id="wave-path"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    ></path>
                </defs>
                <g className="wave1">
                    <use xlinkHref="#wave-path" x="50" y="3"></use>
                </g>
                <g className="wave2">
                    <use xlinkHref="#wave-path" x="50" y="0"></use>
                </g>
                <g className="wave3">
                    <use xlinkHref="#wave-path" x="50" y="9"></use>
                </g>
            </svg>
        </section>
    );
}

export default Hero;