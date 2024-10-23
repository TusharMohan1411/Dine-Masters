import { assets } from '../../assets/assets'
import './Reviews.css'
import { motion, useAnimation, useInView } from 'framer-motion'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef } from 'react';

const Reviews = () => {

    const CUSTOMER_REVIEWS = [
        {
            name: "Rajesh Sharma",
            location: "Delhi",
            reviewText: "“The food from Fudo is just outstanding! It always arrives on time, fresh and piping hot. I love the variety of dishes they offer.”"
        },
        {
            name: "Anita Verma",
            location: "Mumbai",
            reviewText: "“Fudo has the most amazing food options. Whether it’s breakfast or dinner, their quality is top-notch and the delivery is super fast.”"
        },
        {
            name: "Sanjay Gupta",
            location: "Bangalore",
            reviewText: "“I’m really impressed with Fudo’s service. The meals are incredibly tasty, and the fast delivery makes it my go-to food delivery service.”"
        },
        {
            name: "Priya Patel",
            location: "Chennai",
            reviewText: "“Fudo’s customer service is exceptional. Their team is friendly and quick to resolve any issues. The food is always delicious and served hot.”"
        },
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: window.innerWidth <= 768 ? "-50px" : "-300px", });
    const mainControls = useAnimation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    const reviewImgVariants = {
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 100, x: 0, transition: { duration: 1.2 } }
    }

    useEffect(() => {
        if (isInView) {
            mainControls.start('show')
        }
    }, [isInView])


    return (
        <section className="reviews">
            <div className="reviews-image">
                <motion.img
                    ref={ref}
                    variants={reviewImgVariants}
                    initial="hidden"
                    animate={mainControls}
                    src={assets.reviews_main}
                    alt=""
                />
            </div>
            <div className="reviews-content">
                <div className="reviews-heading">
                    <p>WHAT THEY SAY</p>
                    <h2>What Our Customers <br /> Say About Us</h2>
                </div>
                <div className="customer-reviews">
                    <Slider {...settings}>
                        {CUSTOMER_REVIEWS.map((item, index) => {
                            return (
                                <div key={index} className='each-customer'   >
                                    <p>{item.reviewText}</p>
                                    <div className="customer-review-data">
                                        <img src={assets.review_customer} alt="" />
                                        <div>
                                            <h2>{item.name}</h2>
                                            <p>{item.location}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>

                </div>
            </div>
        </section>
    )
}

export default Reviews