import { assets } from '../../assets/assets';
import './Navbar.css';
import Clock from '../Clock/Clock.jsx'

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={assets.logo} className='logo' alt="" />
            <Clock />
        </div>
    )
}

export default Navbar