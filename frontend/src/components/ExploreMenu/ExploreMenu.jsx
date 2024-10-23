import { useEffect, useRef } from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";
import { motion, useAnimation, useInView } from "framer-motion";


const ExploreMenu = ({ category, setCategory }) => {

    const ref = useRef(null);
    const isInView = useInView(ref);
    const mainControls = useAnimation();

    const exploreVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const exploreItems = {
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    useEffect(() => {
        if (isInView) {
            mainControls.start('show')
        }
    }, [isInView])

    return (
        <div className="explore-menu" id="explore-menu">
            <p className="mini-heading">OUR MENU</p>
            <h1>Menu That Always <br /> Makes You Fall In Love</h1>
            <motion.div
                ref={ref}
                variants={exploreVariants}
                initial="hidden"
                animate={mainControls}
                className="explore-menu-list"
            >
                {menu_list.map((item, index) => {
                    return (
                        <motion.div
                            variants={exploreItems}
                            onClick={() =>
                                setCategory((prev) =>
                                    prev === item.menu_name ? "All" : item.menu_name
                                )
                            }
                            key={index}
                            className="explore-menu-list-item"
                        >
                            <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
                            <p className={category === item.menu_name ? 'active-text' : ''}>{item.menu_name}</p>
                        </motion.div>
                    );
                })}
            </motion.div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
