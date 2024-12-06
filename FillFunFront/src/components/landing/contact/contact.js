import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setIsSent(false);

        try {
            const response = await fetch('http://localhost:5000/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSent(true); // Update state to show the sent message
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                const errorText = await response.text();
                setErrorMessage(errorText);
            }
        } catch (error) {
            setErrorMessage(error.toString());
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="contact section">
            <div className="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <div>
                    <span>Check Our</span>{" "}
                    <span className="description-title">Contact</span>
                </div>
            </div>
            <div className="container" data-aos="fade" data-aos-delay={100}>
                <div className="row gy-4">
                    <div className="col-lg-4">
                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={200}>
                            <i className="bi bi-geo-alt flex-shrink-0" />
                            <div>
                                <h3>Address</h3>
                                <p>Amman, Jordan</p>
                            </div>
                        </div>
                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={300}>
                            <i className="bi bi-telephone flex-shrink-0" />
                            <div>
                                <h3>Call Us</h3>
                                <p>+962 78690 7594</p>
                            </div>
                        </div>
                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                            <i className="bi bi-envelope flex-shrink-0" />
                            <div>
                                <h3>Email Us</h3>
                                <p>fillfun@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Your Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Your Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        placeholder="Subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        rows={6}
                                        placeholder="Message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-12 text-center">
                                    <div className={`loading ${isLoading ? 'd-block' : ''}`}>Loading...</div>
                                    <div className={`error-message ${errorMessage ? 'd-block' : ''}`}>{errorMessage}</div>
                                    <div className={`sent-message ${isSent ? 'd-block' : ''}`}>Your message has been sent. Thank you!</div>
                                    <button type="submit" disabled={isLoading}>Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
