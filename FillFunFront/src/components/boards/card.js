import React, { useState } from "react";

function Card({ board }) {

    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="card" style={{ width: "18rem", position: "relative" }}>
            {/* Favorite Icon */}
            <button
                type="button"
                className={`btn btn-link p-0 position-absolute top-0 end-0 m-2 ${isFavorite ? "text-danger" : "text-muted"}`}
                onClick={toggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
            </button>

            <img className="card-img-top" src={board.image} alt="Card cap" />
            <div className="card-body">
                <h5 className="card-title">{board.category}</h5>
                <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                    Play Now
                </a>
            </div>
        </div>
    );
}

export default Card;
