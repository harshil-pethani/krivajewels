import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ExploreProducts from '../Components/ExploreProducts';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import { ToastContainer } from 'react-toastify';

const ExplorePage = () => {
    return (
        <div className="homePage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar />
            <Header ExplorePage={true} />
            <ExploreProducts />
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default ExplorePage;