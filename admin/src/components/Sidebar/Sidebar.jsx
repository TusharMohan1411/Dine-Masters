import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { IoAddCircleOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { BsBasket3 } from "react-icons/bs";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to={'/'} className="sidebar-option">
                    <p className='admin-icons'>
                        <IoAddCircleOutline />
                    </p>
                    <h4>Add Items</h4>
                </NavLink>
                <NavLink to={'/list'} className="sidebar-option">
                    <p className='admin-icons'>
                        <IoFastFoodOutline />
                    </p>
                    <h4>Our Products</h4>
                </NavLink>
                <NavLink to={'/orders'} className="sidebar-option">
                    <p className='admin-icons'>
                        <BsBasket3 />
                    </p>
                    <h4>Orders</h4>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar