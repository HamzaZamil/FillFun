import React, { useState } from "react";

function Filtering({ onFilterChange, categories }) {
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
    });

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
            <div className="filter-container">
                <h4>Categories</h4>
                <div className="category-list">
                    {categories.map((category) => (
                        <div key={category} className="form-check">
                            <input
                                type="checkbox"
                                id={`category-${category}`}
                                value={category}
                                checked={selectedFilters.categories.includes(category)}
                                onChange={() => handleCheckboxChange("categories", category)}
                                className="form-check-input"
                            />
                            <label htmlFor={`category-${category}`} className="form-check-label">
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filtering;
