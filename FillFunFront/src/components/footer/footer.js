import Logo from "../../assets/logo_white.png";


function Footer() {
    return (
        <footer id="footer" className="footer dark-background">
            <div className="container footer-top">
                <div className="row gy-4">
                    {/* Footer About Section */}
                    <div className="col-lg-4 col-md-6 footer-about">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <img src={Logo} alt="Logo" />
                        </a>
                        <div className="footer-contact pt-3">
                            <p>123 Main Street</p>
                            <p>Amman, Jordan</p>
                            <p className="mt-3">
                                <strong>Phone:</strong> <span>+962 7869 7594</span>
                            </p>
                            <p>
                                <strong>Email:</strong> <span>fillfun@gmail.com</span>
                            </p>
                        </div>
                    </div>

                    {/* Useful Links Section */}
                    <div className="col-lg-4 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#about">About us</a></li>
                            {/* <li><a href="#services">Services</a></li> */}
                        </ul>
                    </div>

                    {/* Social Links Section */}
                    <div className="col-lg-4 col-md-12 footer-newsletter">
                        <h4>Follow Us</h4>
                        <div className="social-links d-flex mt-4">
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center pb-2">
                <p>
                    © <span>2024</span> <strong className="px-1 sitename">FillFun</strong>. All Rights Reserved.
                </p>
               
            </div>
        </footer>
    );
}

export default Footer;
