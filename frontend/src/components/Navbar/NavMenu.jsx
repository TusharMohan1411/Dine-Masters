import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion"

const NavMenu = ({ setIsNavOpen, isNavOpen }) => {

    const navbarAnimation = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 25 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.ul
            variants={navbarAnimation}
            initial="hidden"
            animate="show"
            className={`navbar-menu ${isNavOpen ? 'nav-menu-open' : ''}`}
        >
            <motion.li variants={item}>
                <NavLink to={'/'} onClick={() => setIsNavOpen(false)} >Home</NavLink>
            </motion.li>
            <motion.li variants={item} >
                <a href='#explore-menu' onClick={() => setIsNavOpen(false)}>Menu</a>
            </motion.li>
            <motion.li variants={item}>
                <a href='#app-download' onClick={() => setIsNavOpen(false)}>Download App</a>
            </motion.li>
            <motion.li variants={item}>
                <a href='#footer' onClick={() => setIsNavOpen(false)}>Contact Us</a>
            </motion.li>
        </motion.ul>
    )
}

export default NavMenu