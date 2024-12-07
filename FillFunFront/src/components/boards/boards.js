import { useEffect, useState, } from "react";
import Filtering from './filtering';
import Card from './card';
import Search from './search';
import { useLocation } from "react-router-dom";


function Boards() {
    const [boards, setBoards] = useState([]);
    const [filteredBoards, setFilteredBoards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    useEffect(() => {
        fetch('/data/trivia_boards.json')
            .then(response => response.json())
            .then(data => {
                setBoards(data);
                setCategories([...new Set(data.map(board => board.category))]);

                if (location.state?.category) {
                    const initialFiltered = data.filter(board => board.category === location.state.category);
                    setFilteredBoards(initialFiltered);
                } else {
                    setFilteredBoards(data);
                }
            })
            .catch(err => console.log(err));
    }, [location.state]);

    const handleFilterChange = (filters) => {
        const filtered = boards.filter(board => {
            const matchesCategory = filters.categories.length === 0 || filters.categories.includes(board.category);
            const matchesSearch = board.name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
        setFilteredBoards(filtered);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = boards.filter(board => {
            const matchesSearch = board.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = categories.length === 0 || categories.includes(board.category);
            return matchesSearch && matchesCategory;
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

            <section id="starter-section" className="starter-section section">
                <div className="container section-title" data-aos="fade-up">
                    <h2>Boards Section</h2>
                    <div>
                        <span>Check Our </span>
                        <span className="description-title">Boards</span>
                    </div>
                </div>
                <div className="container" data-aos="fade-up">
                    <Search handleSearch={handleSearch} />
                    <div className="row">
                        <div className='col-md-4'>
                            <Filtering onFilterChange={handleFilterChange} categories={categories} />
                        </div>
                        <div className='col-md-8'>
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
