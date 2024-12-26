import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Category from '../Components/Category';
import NewArrivals from '../Components/NewArrivals';
import Footer from '../Components/Footer';
import CustomizeJewellery from '../Components/CustomizeJewellery';
import Services from '../Components/services';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import ShopByDiamond from '../Components/ShopByDiamond';
import FAQ from '../Components/FAQ';
import { getAllFiltersApi } from '../Config/API_constant';
import apiRequest from '../CommonUtil';


const HomePage = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 20) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 20) {
            setShowScroll(false)
        }
    };

    window.addEventListener('scroll', checkScrollTop);

    async function getAllFilters() {
        try {
            const res = await apiRequest(getAllFiltersApi, 'GET');
            const filters = [{ name: "Category", data: res.data[0] }, { name: "Diamond", data: res.data[1] }];
            localStorage.setItem("KrivaFilters", JSON.stringify(filters));
        } catch (e) {
            // console.log(e);
            toast.error("Something went wrong !", {
                position: "top-right"
            });
        }
    }

    useEffect(() => {
        getAllFilters();
    }, []);

    return (
        <div className="homePage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar />
            <Header />
            <Category />
            <ShopByDiamond />
            <NewArrivals />
            <CustomizeJewellery />
            <FAQ />
            <Services />
            <Footer />
        </div>
    )
}

export default HomePage;