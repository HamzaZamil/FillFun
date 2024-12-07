import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({ board }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handlePlayNow = () => {
        navigate('/quiz', { state: { questions: board.questions } });
    };

    return (
        <div className="card" style={{ width: "15rem", position: "relative" }}>
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
                <h5 className="card-title">{board.name}</h5>
                <p className="card-text">
                    {board.description}
                </p>
                <button onClick={handlePlayNow} className="btn btn-primary">
                    Play Now
                </button>
            </div>
        </div>
    );
}

export default Card;
