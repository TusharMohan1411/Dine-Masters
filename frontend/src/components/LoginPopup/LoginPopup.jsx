import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'
import { createPortal } from 'react-dom';
import { motion } from "framer-motion";

const LoginPopup = ({ setShowLogin, showLogin, onClose }) => {
    if (!showLogin) return null;

    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += '/api/user/login'
        } else {
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        } else {
            alert(response.data.message)
        }
    }

    // Motion Animation

    return createPortal(
        <motion.dialog
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="login-popup"
            onClick={onClose}
        >
            <motion.form
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={onLogin}
                onClick={(e) => e.stopPropagation()}
                className="login-popup-container"
            >
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={onClose}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? (
                        <> </>
                    ) : (
                        <input
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder="Your Name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">{currState === "Sign up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Don't have an account?
                        <span onClick={() => setCurrState("Sign up")}> Create Account</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?
                        <span onClick={() => setCurrState("Login")}> Login here</span>
                    </p>
                )}
            </motion.form>
        </motion.dialog>, document.getElementById('modal')
    );
};

export default LoginPopup;
