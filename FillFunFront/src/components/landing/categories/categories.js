import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Array of category icons
const categoryIcons = [
    { name: 'Geography', icon: 'bi-map' },
    { name: 'Entertainment: Music', icon: 'bi-music-note' },
    { name: 'Entertainment: Film', icon: 'bi-film' },
    { name: 'Entertainment: Books', icon: 'bi-book' },
    { name: 'Science & Nature', icon: 'bi-tree' },
    { name: 'Science: Computers', icon: 'bi-laptop' },
    { name: 'Science: Mathematics', icon: 'bi-calculator' },
    { name: 'Mythology', icon: 'bi-lightning' },
    { name: 'Sports', icon: 'bi-trophy' },
    { name: 'Geography', icon: 'bi-map' },
    { name: 'History', icon: 'bi-clock-history' },
    { name: 'Politics', icon: 'bi-person-lines-fill' },
    { name: 'Art', icon: 'bi-brush' },
    { name: 'Celebrities', icon: 'bi-star' },
    { name: 'Animals', icon: 'bi-bug' },
    { name: 'Vehicles', icon: 'bi-truck' },
    { name: 'Entertainment: Comics', icon: 'bi-book-half' },
    { name: 'Science: Gadgets', icon: 'bi-tools' },
    { name: 'Entertainment: Japanese Anime & Manga', icon: 'bi-file-earmark-font' },
    { name: 'Entertainment: Cartoon & Animations', icon: 'bi-film' }
];

const LandingPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/trivia_boards.json');
                const data = await response.json();
                

                const categoriesWithIcons = data.map(category => {
                    const matchingIcon = categoryIcons.find(icon => icon.name === category.category);
                    return {
                        ...category,
                        icon: matchingIcon ? matchingIcon.icon : 'bi-question-circle'
                    };
                });
                setCategories(categoriesWithIcons);
            } catch (err) {
                console.error("Failed to load trivia boards:", err);
            }
        };

        fetchCategories();
    }, []);

    const handleCardClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <section id="features" className="features section">
                {/* Section Title */}
                <div className="container section-title" data-aos="fade-up">
                    <div>
                        <span className="description-title">Categories</span>
                    </div>
                </div>
                {/* End Section Title */}
                    <div className="container">
                        <div className="row gy-4">
                            {categories.map((category) => (
                                <div
                                    key={category.board_id}
                                    className="col-lg-3 col-md-4"
                                    data-aos="fade-up"
                                    data-aos-delay={100}
                                    onClick={() => handleCardClick(category.board_id)}
                                >
                                    <div className="features-item">
                                        <i className={`bi ${category.icon}`} style={{ color: "#ffbb2c" }} />
                                        <h3>
                                            <a href="#" className="stretched-link">
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
