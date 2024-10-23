import { Bars } from 'react-loader-spinner';
import { FaClock } from "react-icons/fa6";
import useTime from '../../hooks/useTime';
import './Clock.css'

export default function Time() {
    const date = new Date;
    const { finalDate, realTime, timeLoading } = useTime({ date });

    return (
        <div className="clock-container">
            {!timeLoading ?
                <div className="clock-content">
                    <div>
                        <h1 className="clock-icon"><FaClock /></h1>
                    </div>
                    <div className="clock-info">
                        <h3 className="clock-time">{realTime}</h3>
                        <h3 className="clock-date">{finalDate}</h3>
                    </div>
                </div>
                :
                <div className="spinner-container">
                    <Bars
                        height="50"
                        width="50"
                        color="black"
                        ariaLabel="custom-puff-loading"
                        visible={true}
                    />
                </div>
            }
        </div>

    );
}
