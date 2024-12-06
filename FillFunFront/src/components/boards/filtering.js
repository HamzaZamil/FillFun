import React, { useState } from "react";

function Filtering({ onFilterChange }) {
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        difficulty: [],
    });

    const categories = ["Science", "History", "Geography", "Entertainment"];
    const difficulties = ["Easy", "Medium", "Hard"];

    const handleCheckboxChange = (type, value) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            const isChecked = updatedFilters[type].includes(value);

            if (isChecked) {
                updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
            } else {
                updatedFilters[type].push(value);
            }

            onFilterChange(updatedFilters);
            return updatedFilters;
        });
    };

    return (
        <div className="filtering">

            {/* Categories Filter */}
            <div>
                <h4>Categories</h4>
                {categories.map((category) => (
                    <div key={category}>
                        <input
                            type="checkbox"
                            id={`category-${category}`}
                            value={category}
                            checked={selectedFilters.categories.includes(category)}
                            onChange={() => handleCheckboxChange("categories", category)}
                        />
                        <label htmlFor={`category-${category}`} className="mx-2">{category}</label>
                    </div>
                ))}
            </div>

            {/* Difficulty Filter */}
            <div>
                <h4 className="mt-3">Difficulty</h4>
                {difficulties.map((level) => (
                    <div key={level}>
                        <input
                            type="checkbox"
                            id={`difficulty-${level}`}
                            value={level}
                            checked={selectedFilters.difficulty.includes(level)}
                            onChange={() => handleCheckboxChange("difficulty", level)}
                        />
                        <label htmlFor={`difficulty-${level}`} className="mx-2">{level}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filtering;
