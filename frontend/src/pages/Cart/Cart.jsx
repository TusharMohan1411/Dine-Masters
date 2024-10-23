import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { motion } from "framer-motion"

const Cart = () => {
    const { token, cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
    const navigate = useNavigate()

    const cartAnimation = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.4, }, },
    };

    const item = {
        hidden: { opacity: 0, y: -100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4, type: 'spring',
                stiffness: 150,
                damping: 8,
            }
        },
    };

    const proceedToCheckout = () => {
        if (!token) {
            alert("Please Login to your account to continue!")
            return;
        } else if (getTotalCartAmount() === 0) {
            alert("Please add some items in cart to continue!")
            navigate('/')
        } else {
            navigate('/order')
        }
    }

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index} >
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>₹{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>₹{item.price * cartItems[item._id]}</p>
                                    <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Total Amount</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</p>
                        </div>
                        <hr />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.09, background: 'black' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        onClick={proceedToCheckout}
                    >
                        PROCEED TO CHECKOUT
                    </motion.button>

                </div>
                <motion.div
                    variants={cartAnimation}
                    initial="hidden"
                    animate="show"
                    className="cart-ads"
                >
                    <motion.img variants={item} src={assets.cart_page1} alt="" />
                    <motion.img variants={item} src={assets.cart_page2} alt="" />
                    <motion.img variants={item} src={assets.cart_page3} alt="" />
                </motion.div>
            </div>
        </div>
    )
}

export default Cart