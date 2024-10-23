import { useContext, useEffect, useRef } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { AnimatePresence, delay, motion, useAnimation, useInView } from "framer-motion"


const FoodItem = ({ id, name, price, image }) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Animations
    const ref = useRef(null);
    const isInView = useInView(ref);
    const mainControls = useAnimation();

    const foodItemVariants = {
        hidden: { opacity: 0, scale: 0.8 }, // Start off-screen with reduced scale
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                delay: 0.2
            }

        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.3,
            }
        },
    };


    useEffect(() => {
        if (isInView) {
            mainControls.start('show')
        }
    }, [isInView])



    return (
        <AnimatePresence>
            <motion.div
                ref={ref}
                variants={foodItemVariants}
                initial="hidden"
                animate={mainControls}
                exit="exit"
                className="food-item"
            >
                <div className="food-item-img-container">
                    <img src={url + "/images/" + image} alt="" className="food-item-image" />
                    {
                        !cartItems[id] ?
                            <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                            : <div className="food-item-counter">
                                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                                <p>{cartItems[id]}</p>
                                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                            </div>
                    }
                </div>

                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="food-item-price">₹{price}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default FoodItem;