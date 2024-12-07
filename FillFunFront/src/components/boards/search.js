import React from "react";

function Search({handleSearch}) {

    const searchChange = (e)=>{
        handleSearch(e.target.value);
    }

    return (
        <div className="container py-3">
            <form className="d-flex align-items-center">

                <input
                    type="search"
                    className="form-control me-2"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={searchChange}

                />

            </form>
        </div>
    );
}

export default Search;
