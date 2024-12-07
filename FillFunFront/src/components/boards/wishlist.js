import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import Card from "./card";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setIsLoggedIn(false);
      setLoading(false);
    } else {
      setIsLoggedIn(true);
      fetchWishlist();
    }
  }, []);

  const fetchWishlist = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Please Log in",
          text: "Please log in to view your wishlist.",
        });
        setIsLoggedIn(false);
        return;
      }

      const response = await axiosInstance.get(`/wishlist`, {
        params: { user_id: userId },
      });

      // Extract the nested `board` objects
      const wishlistData = response.data.boards.map((item) => item.board);

      setWishlist(wishlistData);
      console.log("Wishlist fetched:", wishlistData);
      setIsLoggedIn(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message || "Failed to fetch wishlist items.",
      });
    } finally {
      setLoading(false);
    }
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
                wishlist.map((board) => <Card key={board.id} board={board} />)
              ) : (
                <p>No items in your wishlist yet!</p>
              )}
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <p>You must log in to see your wishlist boards.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Wishlist;
