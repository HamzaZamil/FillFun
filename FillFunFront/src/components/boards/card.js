import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import "./card.css";

function Card({ board, isFavoriteInitial, onRemoveFromWishlist }) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const navigate = useNavigate();

  const toggleFavorite = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        text: "Please log in to add to favorites.",
      }).then(() => navigate("/login"));
      return;
    }

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    try {
      const response = await axiosInstance.post("/wishlist/toggle", {
        board_id: board.id,
        user_id: userId,
      });

      Swal.fire({
        icon: "success",
        title: newFavoriteState
          ? "Added to Favorites"
          : "Removed from Favorites",
        text: `Board has been ${newFavoriteState ? "added to" : "removed from"} your favorites.`,
      });

      if (!newFavoriteState) {
        onRemoveFromWishlist(board.id);
      }
    } catch (error) {
      setIsFavorite(!newFavoriteState);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handlePlayNow = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        text: "Please log in first to play.",
      }).then(() => navigate("/login"));
      return;
    }
    navigate("/quiz", { state: { questions: board.questions, board } });
  };

  return (
    <div className="board-card mt-3" style={{ borderRadius: "5px" }}>
      <div className="heart-button-wrapper">
        <button
          type="button"
          className={`btn btn-link p-0 ${isFavorite ? "text-danger" : "text-muted"}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>

      <img className="card-img-top" src={board.image} alt="Board Thumbnail" />

      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title text-center" style={{ color: "#040677" }}>
          {board.name}
        </h5>
        <p className="card-text text-center">{board.description}</p>
        <button onClick={handlePlayNow} className="btn btn-primary mt-auto">
          Play Now
        </button>
      </div>
    </div>
  );
}

export default Card;
