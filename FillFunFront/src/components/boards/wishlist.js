import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import Card from "./card";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setIsLoggedIn(false);
      setLoading(false);
    } else {
      setIsLoggedIn(true);
      fetchWishlist(userId);
    }
  }, []);

  const fetchWishlist = async (userId) => {
    try {
      const response = await axiosInstance.get(`/wishlist`, {
        params: { user_id: userId },
      });

      const boardIds = response.data.boards.map((item) => item.board_id);

      const jsonResponse = await fetch("/data/trivia_boards.json");
      if (!jsonResponse.ok) {
        throw new Error("Failed to fetch trivia boards data.");
      }

      const jsonBoards = await jsonResponse.json();
      const wishlistData = jsonBoards.filter((board) =>
        boardIds.includes(board.id)
      );

      const wishlistWithFavoriteStatus = wishlistData.map((board) => {
        const isFavorite = boardIds.includes(board.id); 
        return { ...board, isFavorite };
      });

      setWishlist(wishlistWithFavoriteStatus);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch wishlist items.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (boardId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((board) => board.id !== boardId));
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-title dark-background">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Wishlist Page</h1>
                <p className="mb-0">
                  Your favorite picks are all here—whether it’s games you’re
                  saving to play later or the ones you’ve enjoyed and want to
                  revisit!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="starter-section" className="starter-section section">
        <div className="container">
          {isLoggedIn ? (
            <div
              className="d-flex justify-content-center align-items-center flex-wrap"
              style={{ minHeight: "60vh", gap: "30px" }}
            >
              {wishlist.length > 0 ? (
                wishlist.map((board) => (
                  <Card
                    key={board.id}
                    board={board}
                    isFavoriteInitial={board.isFavorite}
                    onRemoveFromWishlist={removeFromWishlist} 
                  />
                ))
              ) : (
                <p>No items in your wishlist yet!</p>
              )}
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <p>You must log in to view your wishlist boards.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Wishlist;
