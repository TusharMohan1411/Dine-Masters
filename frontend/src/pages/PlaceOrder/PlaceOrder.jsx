import { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = async (event) => {
        const { name, value } = event.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 40
        }

        const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })

        const { razorpayOrderId, orderId, amount: totalAmount } = response.data;

        const options = {
            key: 'rzp_test_XL0lNjtI63CF47',
            amount: totalAmount,
            currency: 'INR',
            name: 'DineMaster Pro',
            description: 'Food Order Payment',
            order_id: razorpayOrderId,
            handler: async function (response) {
                const verifyResponse = await axios.post(url + "/api/order/verify", {
                    orderId,
                    paymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                });

                if (verifyResponse.status === 200) {
                    alert("Order Placed Successfully", `Order Id: ${orderId}`)
                    setCartItems({})
                    navigate('/myorders')
                } else {
                    alert('Payment verification failed.');
                    navigate('/')
                }
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart')
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form className='place-order' onSubmit={placeOrder}>
            <div className="place-order-left">
                <p className="title">Deliver Information</p>
                <div className="multi-fields">
                    <input required type="text" placeholder='First Name' name='firstName' onChange={onChangeHandler} value={data.firstName} />
                    <input required type="text" placeholder='Last Name' name='lastName' onChange={onChangeHandler} value={data.lastName} />
                </div>
                <input required type="email" placeholder='Email address' name='email' onChange={onChangeHandler} value={data.email} />
                <input required type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street} />
                <div className="multi-fields">
                    <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} />
                    <input required type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} />
                </div>
                <div className="multi-fields">
                    <input required type="text" placeholder='Pin Code' name='pincode' onChange={onChangeHandler} value={data.pincode} />
                    <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} />
                </div>
                <input required type="text" placeholder='Phone' name='phone' onChange={onChangeHandler} value={data.phone} />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
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
                    <button type='submit'>PROCEED TO PAYMENTS</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder