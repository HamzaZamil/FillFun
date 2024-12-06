import { useEffect, useState } from "react";
import Filtering from './filtering';
import Card from './card';
import Search from './search';

function Boards() {
    const [boards, setBoards] = useState([]);
    const [filteredBoards, setFilteredBoards] = useState([]);

    useEffect(() => {
        fetch('/data/trivia_boards.json')
            .then(response => response.json())
            .then(data => {

                setBoards(data);
                setFilteredBoards(data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleFilterChange = (filters) => {
        console.log(filters);

        const filtered = boards.filter(board => {
            return board.category === filters.category;
        });
        setFilteredBoards(filtered);
    };

    return (
        <>

            <div className="page-title dark-background" data-aos="fade">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1>Boards Page</h1>
                                <p className="mb-0">
                                    Explore engaging trivia boards packed with exciting questions—test your knowledge and challenge yourself
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Page Title */}

            {/* Starter Section */}
            <section id="starter-section" className="starter-section section">

                <div className="container section-title" data-aos="fade-up">
                    <h2>Boards Section</h2>
                    <div>
                        <span>Check Our </span>
                        <span className="description-title">Boards</span>
                    </div>
                </div>
                {/* End Section Title */}
                <div className="container" data-aos="fade-up">
                    <Search />
                    <div className="row">

                        <div className='col-md-3'>
                            <Filtering onFilterChange={handleFilterChange} />
                        </div>

                        {/* Cards for the filtered boards */}
                        <div className='col-md-9'>
                            <div className="row">

                                {filteredBoards.map((board, index) => (
                                    <div key={index} className="col-md-4 m-2">
                                        <Card board={board} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Boards;
