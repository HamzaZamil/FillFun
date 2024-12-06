import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api_category.php');

                if (response.data.trivia_categories) {
                    setCategories(response.data.trivia_categories);
                } else {
                    setError('Failed to fetch categories');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCardClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-6">Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <section id="features" className="features section">
                    <div className="container">
                        <div className="row gy-4">
                            {categories.map((category) => (
                                <div
                                key={category.id}
                                className="col-lg-3 col-md-4"
                                data-aos="fade-up"
                                data-aos-delay={100}
                                onClick={() => handleCardClick(category.id)}
                                >
                                <div className="features-item">
                                    <i className="bi bi-eye" style={{ color: "#ffbb2c" }} />
                                    <h3>
                                        <a href="" className="stretched-link">
                                        {category.name}
                                        </a>
                                    </h3>
                                </div>
                            </div>
                ))}
                </div>
                </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;
