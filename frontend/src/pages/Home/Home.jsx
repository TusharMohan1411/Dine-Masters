import { useState } from 'react'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import './Home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Reviews from '../../components/Reviews/Reviews'
import AppDownload from '../../components/AppDownload/AppDownload'


const Home = () => {

    const [category, setCategory] = useState('All');

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <Reviews />
            <AppDownload />
        </div>
    )
}

export default Home