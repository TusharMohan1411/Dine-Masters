import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className="footer-logo" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maiores, dolor placeat voluptatem dicta minima reprehenderit
                        voluptatum unde eos nemo blanditiis voluptas porro nisi
                        culpa illo sunt quod eaque ut at et mollitia, quas
                        laudantium, aspernatur iusto doloribus! Rem amet
                        itaque accusantium voluptatum, dicta maiores delectus
                        officia ipsam similique dignissimos fugit.
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9857566235</li>
                        <li>contact@dinemasters.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2024 @ DineMasters.com - All Rights Reserved
            </p>
        </div>
    )
}

export default Footer;