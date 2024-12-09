import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const categoryIcons = [
    { name: 'Geography', icon: 'bi-map' },
    { name: 'Entertainment', icon: 'bi-music-note' },
    { name: 'Science', icon: 'bi-tree' },
    { name: 'Mythology', icon: 'bi-lightning' },
    { name: 'Sports', icon: 'bi-trophy' },
    { name: 'History', icon: 'bi-clock-history' },
    { name: 'Politics', icon: 'bi-person-lines-fill' },
    { name: 'Art', icon: 'bi-brush' },
    { name: 'Celebrities', icon: 'bi-star' },
    { name: 'Vehicles', icon: 'bi-truck' },

];

const LandingPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('data/trivia_boards.json');
                const data = await response.json();

                const uniqueCategories = Array.from(
                    new Set(data.map(category => category.category))
                );

                const categoriesWithIcons = uniqueCategories.map(category => {
                    const matchingIcon = categoryIcons.find(icon => icon.name === category);
                    return {
                        category,
                        icon: matchingIcon ? matchingIcon.icon : 'bi-question-circle',
                    };
                });

                setCategories(categoriesWithIcons);
            } catch (err) {
                console.error("Failed to load trivia boards:", err);
            }
        };

        fetchCategories();
    }, []);

    const handleCardClick = (category) => {
        navigate('/boards', { state: { category } });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <section id="features" className="features section">
                    <div className="container section-title" data-aos="fade-up">
                        <div>
                            <span className="description-title">Categories</span>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row gy-4">
                            {categories.map((category) => (
                                <div
                                    key={category.board_id}
                                    className="col-lg-3 col-md-4"
                                    data-aos="fade-up"
                                    data-aos-delay={100}
                                    onClick={() => handleCardClick(category.category)}
                                >
                                    <div className="features-item">
                                        <i className={`bi ${category.icon}`} style={{ color: "#ffbb2c" }} />
                                        <h3>
                                            <a href="" className="stretched-link">
                                                {category.category}
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
