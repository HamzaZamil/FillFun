import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import "./card.css";

function Card({ board }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfFavorite = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      try {
        const response = await axiosInstance.get("/wishlist/isInWishlist", {
          params: {
            user_id: userId,
            board_id: board.id,
          },
        });
        if (response.status === 200) {
          setIsFavorite(response.data.isFavorite);
        }
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkIfFavorite();
  }, [board.id]);

  const handlePlayNow = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        text: "Please log in first to play.",
      });
      return;
    }
    navigate("/quiz", { state: { questions: board.questions, board } });
  };

  const toggleFavorite = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Must Login",
          text: "Please log in to add to favorites.",
        });
        return;
      }

      const response = await axiosInstance.post("/wishlist/toggle", {
        board_id: board.id,
        user_id: userId,
      });

      if (response.status === 200) {
        setIsFavorite(false);
        Swal.fire({
          icon: "success",
          title: "Removed from Favorites",
          text: "Board has been removed from your favorites.",
        });
      } else if (response.status === 201) {
        setIsFavorite(true);
        Swal.fire({
          icon: "success",
          title: "Added to Favorites",
          text: "Board has been added to your favorites.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="board-card" style={{ width: "18rem" }}>
      <div className="heart-button-wrapper">
        <button
          type="button"
          className={`btn btn-link p-0 ${
            isFavorite ? "text-danger" : "text-muted"
          }`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>

      <img
        className="card-img-top"
        src={board.image}
        alt="Card cap"
        height={200}
      />
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title text-center">{board.name}</h5>
        <p className="card-text text-center">{board.description}</p>
        <button onClick={handlePlayNow} className="btn btn-primary mt-auto">
          Play Now
        </button>
      </div>
    </div>
  );
}

export default Card;