import Detail1 from '../../../assets/img/details-1.png'
import Detail2 from '../../../assets/img/details-2.png'
import Detail3 from '../../../assets/img/details-3.png'
import Detail4 from '../../../assets/img/details-4.png'


function description() {

    return <>
        <>
            <section id="details" className="details section">
                {/* Section Title */}
                {/* <div className="container section-title" data-aos="fade-up">
                    <h2>Details</h2>
                    <div>
                        <span>Check Our</span>{" "}
                        <span className="description-title">Details</span>
                    </div>
                </div> */}
                {/* End Section Title */}
                <div className="container">
                    <div className="row gy-4 align-items-center features-item mt-3">
                        <div
                            className="col-md-5 d-flex align-items-center"
                            data-aos="zoom-out"
                            data-aos-delay={100}
                        >
                            <img src={Detail1} className="img-fluid" alt="" />
                        </div>
                        <div className="col-md-7" data-aos="fade-up" data-aos-delay={100}>
                            <h3>
                            Our mission
                            </h3>
                            <p className="fst-italic">
                            Our mission is to provide a fun and interactive learning experience through our fill-in-the-blank game. We aim to make education and entertainment seamless, engaging users with a variety of categories and questions that challenge their knowledge and creativity.
                            </p>
                            
                        </div>
                    </div>
                    {/* Features Item */}
                    <div className="row gy-4 align-items-center features-item mt-3">
                        <div
                            className="col-md-5 order-1 order-md-2 d-flex align-items-center"
                            data-aos="zoom-out"
                            data-aos-delay={200}
                        >
                            <img src={Detail2} className="img-fluid img-circle" alt="" />
                        </div>
                        <div
                            className="col-md-7 order-2 order-md-1"
                            data-aos="fade-up"
                            data-aos-delay={200}
                        >
                            <h3>Our Vision</h3>
                            <p className="fst-italic">
                            We envision a world where learning is enjoyable and accessible to everyone. Our platform brings together people from all walks of life, encouraging them to expand their horizons through engaging and thought-provoking content.
                            </p>
                            
                        </div>
                    </div>
                    {/* Features Item */}
                    <div className="row gy-4 align-items-center features-item mt-3">
                        <div className="col-md-5 d-flex align-items-center" data-aos="zoom-out">
                            <img src={Detail3} className="img-fluid" alt="" />
                        </div>
                        <div className="col-md-7" data-aos="fade-up">
                            <h3>
                            How It Works
                            </h3>
                            <p>
                            Choose a category that interests you, select a board, and start filling in the blanks! Each board contains multiple questions designed to test your knowledge and creativity. Whether you're a trivia buff or just looking for a fun challenge, our platform has something for everyone.
                            </p>
                           
                        </div>
                    </div>
                    
                </div>
            </section>
            {/* /Details Section */}
        </>

    </>;
}
export default description;