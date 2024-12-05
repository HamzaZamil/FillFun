function Boards() {

    return <>

        {/* Page Title */}
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
            <nav className="breadcrumbs">
                <div className="container">
                    <ol>
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li className="current">Starter Page</li>
                    </ol>
                </div>
            </nav>
        </div>
        {/* End Page Title */}

        <>
            {/* Starter Section Section */}
            <section id="starter-section" className="starter-section section">
                {/* Section Title */}
                <div className="container section-title" data-aos="fade-up">
                    <h2>Boards Section</h2>
                    <div>
                        <span>Check Our </span>
                        <span className="description-title">Boards Section</span>
                    </div>
                </div>
                {/* End Section Title */}
                <div className="container" data-aos="fade-up">
                    <p>Use this page as a starter for your own custom pages.</p>
                    {/* Add all the boards in here */}
                </div>
            </section>
            {/* /Starter Section Section */}
        </>


    </>
}

export default Boards;