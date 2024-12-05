import React, { useState } from "react";


function Filtering({ categories, onFilterChange }) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onFilterChange(category);
    };



    return (
        <div className="filtering">
            <button
                className={`filtering-item ${selectedCategory === "" ? "active" : ""}`}
                onClick={() => handleCategoryChange("")}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`filtering-item ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => handleCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );

}
export default Filtering;