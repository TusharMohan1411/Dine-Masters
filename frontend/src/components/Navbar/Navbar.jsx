import { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { motion } from "framer-motion"
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import NavMenu from './NavMenu'

const Navbar = ({ setShowLogin }) => {

    const [isHovered, setIsHovered] = useState(false);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -70, x: 70, scale: 0 },
        visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.3 } },
    };

    const navigate = useNavigate()

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const logout = () => {
        localStorage.removeItem("token")
        setToken('');
        navigate('/')
    }

    const [isNavOpen, setIsNavOpen] = useState(false);

    const navOpenHandler = () => {
        setIsNavOpen(!isNavOpen)
    }


    return (
        <div className="navbar">
            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} alt="" className='logo' />
            </Link>

            {/* Nav Menus */}
            <NavMenu setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />

            {/* Navbar Right Section */}
            <div className="navbar-right">
                <div className="navbar-cart-icon">
                    <Link to='/cart'>
                        <FaCartShopping className='nav-icons' />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? " " : 'dot'}></div>
                </div>
                {!token ?
                    <motion.button
                        onClick={() => setShowLogin(true)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                    >
                        Sign in
                    </motion.button>
                    : <div
                        className="navbar-profile"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <FaUserCircle className='nav-icons' />

                        {/* Dropdown */}
                        {isHovered && (
                            <motion.ul
                                className="navbar-profile-dropdown"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dropdownVariants}
                            >
                                <motion.li onClick={() => navigate("/myorders")}>
                                    <img src={assets.bag_icon} alt="Bag Icon" />
                                    <p>Orders</p>
                                </motion.li>
                                <hr />
                                <motion.li onClick={logout}>
                                    <img src={assets.logout_icon} alt="Logout Icon" />
                                    <p>Logout</p>
                                </motion.li>
                            </motion.ul>
                        )}
                    </div>
                }
                {!isNavOpen ?
                    <HiOutlineBars3BottomRight className='nav-icons nav-open' onClick={navOpenHandler} />
                    : <CiCircleRemove className='nav-icons nav-open' onClick={navOpenHandler} />
                }
            </div>
        </div>
    )
}

export default Navbar