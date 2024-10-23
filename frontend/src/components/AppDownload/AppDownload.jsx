import { useEffect, useRef } from 'react';
import { assets } from '../../assets/assets'
import './AppDownload.css'
import { motion, useAnimation, useInView } from "framer-motion";

const AppDownload = () => {

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: window.innerWidth <= 768 ? "-50px" : "-300px", });
    const mainControls = useAnimation();

    const appDownloadImgVariants = {
        hidden: { opacity: 0, y: 200 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 150,
                damping: 8,
                duration: 2.9,
            }
        }
    }

    useEffect(() => {
        if (isInView) {
            mainControls.start('show')
        }
    }, [isInView])


    return (
        <section className="appSection" id='app-download'>
            <div className="appSection-content">
                <h6>DOWNLOAD APP</h6>
                <h1>Get Started with <br /> Dine Masters Today!</h1>
                <p>Discover food wherever and whenever and get your food delivered quickly.</p>
                <motion.button
                    whileHover={{ scale: 1.09, background: "black" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 100 }}
                >
                    Get the App
                </motion.button>
            </div>
            <div className="appSection-image">
                <motion.img
                    ref={ref}
                    variants={appDownloadImgVariants}
                    initial="hidden"
                    animate={mainControls}
                    src={assets.app_download} alt=""
                />
            </div>
        </section>
    )
}

export default AppDownload