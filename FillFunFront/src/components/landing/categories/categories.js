import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const categoryIcons = [
    { name: 'Geography', icon: 'bi-map' },
    { name: 'Entertainment: Music', icon: 'bi-music-note' },
    { name: 'Entertainment', icon: 'bi-film' },
    { name: 'Science', icon: 'bi-tree' },
    { name: 'Sports', icon: 'bi-trophy' },
    { name: 'History', icon: 'bi-clock-history' },
    { name: 'Art', icon: 'bi-brush' },
    { name: 'Vehicles', icon: 'bi-truck' },

    { name: 'General Knowledge', icon: 'bi-lightbulb' },



];


const LandingPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // const fetchCategories = async () => {
        
        //     const response = await fetch('data/trivia_boards.json');
        //     const data = await response.json();
        //     // console.log(data);


        //     data.map(category => {
        //         console.log("id:"+category.id+" "+category.category+" "+category.name+" \""+category.description+"\" "+" number_of_questions:"+category.number_of_questions);
        //     });
        // }
        const fetchCategories = () => {
            const categoriesWithIcons = categoryIcons.map(category => ({
                ...category,
                icon: category.icon || 'bi-question-circle',
            }));
            setCategories(categoriesWithIcons);

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
                                    onClick={() => handleCardClick(category.name)}
                                >
                                    <div className="features-item">
                                        <i className={`bi ${category.icon}`} style={{ color: "#ffbb2c" }} />
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
