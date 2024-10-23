import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response.data);

        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error("Error")
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list add flex-col">
            <p>Our Products</p>
            <div className="list-items">
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-item">
                            <img src={`${url}/images/${item.image}`} alt="" />
                            <div className="list-item-details flex-col">
                                <div className="list-items-name">
                                    <h3>{item.name}</h3>
                                    <h3>₹{item.price}</h3>
                                </div>
                                <p>Category: {item.category}</p>
                                <button onClick={() => removeFood(item._id)}>Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default List;
