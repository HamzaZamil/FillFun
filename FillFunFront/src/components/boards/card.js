import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Swal from 'sweetalert2';


function Card({ board }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = async () => {
        try {
            const userId = localStorage.getItem('user_id');
    
            if (!userId) {
                Swal.fire({
                    icon: 'error',
                    title: 'Must Login',
                    text: 'Please log in to add to favorites.',
                });
                return;
            }
    
            const response = await axiosInstance.post('/wishlist/toggle', {
                board_id: board.id,
                user_id: userId,
            });
    
            if (response.status === 200 || response.status === 201) {
                setIsFavorite(response.data.isFavorite);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'Something went wrong!',
            });
        }
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
                <h5 className="card-title">{board.name}</h5>
                <p className="card-text">
                    {board.description}
                </p>
                <a href="#" className="btn btn-primary">
                    Play Now
                </a>
            </div>
        </div>
    );
}

export default Card;