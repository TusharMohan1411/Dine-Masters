import { assets } from '../../assets/assets'
import './Header.css'
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "framer-motion";

const Header = () => {

    const headerVariants = {
        hidden: { opacity: 0, y: -100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 8,
                duration: 2.9,
            }
        }
    };

    const headerImgVariants = {
        hidden: { opacity: 0, x: 100 },
        show: { opacity: 100, x: 0, transition: { duration: 1 } }
    }

    return (
        <div className="header">
            <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="show"
                className="header-contents"
            >
                <p>We Offer </p>
                <h2>
                    <Typewriter
                        words={[
                            'Tasty Meals..',
                            'Best Quality..',
                            'Fast Delivery..'
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="."
                        typeSpeed={80}
                        deleteSpeed={70}
                        delaySpeed={2000}
                    />
                </h2>

                <a href="#explore-menu">
                    <motion.button
                        whileHover={{ scale: 1.09 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        View Menu
                    </motion.button>
                </a>
            </motion.div>

            <motion.div
                variants={headerImgVariants}
                initial="hidden"
                animate="show"
                className="header-img"
            >
                <img src={assets.header_image} alt="" />
            </motion.div>
        </div>
    )
}

export default Header