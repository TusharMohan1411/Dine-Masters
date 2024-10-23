import { useContext, useEffect, useState } from "react";
import "./MyOrders.css"
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { assets } from "../../assets/assets";
import { motion } from "framer-motion"

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
        setData(response.data.data)
        console.log(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    // Animations
    const cartAnimation = {
        hidden: { opacity: 0, y: 100 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
    };

    useEffect(() => {
        if (!token) {
            alert("Please Login to your account to access this page.")
            navigate("/")
        }
    }, [token])

    return (
        token ?
            <div className="my-orders">
                < h2 > My Orders</h2 >
                <motion.div
                    variants={cartAnimation}
                    initial="hidden"
                    animate="show"
                    className="container"
                >
                    {data.slice().reverse().map((order, index) => {
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <div>{order.items.map((item, index) => {
                                    return <p key={index}> {item.name + 'x' + item.quantity} </p>
                                })}
                                </div>
                                <p>₹{order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Update Status</button>
                            </div>
                        )
                    })}
                </motion.div>
            </div >
            : <div>Not Authorized</div>
    )
}

export default MyOrders