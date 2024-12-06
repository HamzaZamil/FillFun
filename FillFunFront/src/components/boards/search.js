import React from "react";

function Search() {
    return (
        <div className="container py-3">
            <form className="d-flex align-items-center">

                <input
                    type="search"
                    className="form-control me-2"
                    placeholder="Search"
                    aria-label="Search"
                />

                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
        </div>
    );
}

export default Search;
