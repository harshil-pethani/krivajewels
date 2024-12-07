import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header';
import Category from '../Components/Category';
import TopSellingItems from '../Components/TopSellingItems';
import Footer from '../Components/Footer';
import CustomizeJewellery from '../Components/CustomizeJewellery';
import Services from '../Components/services';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import ShopByDiamond from '../Components/ShopByDiamond';
import { getAllFiltersApi } from '../Config/API_constant';
import axios from 'axios';
import FAQ from '../Components/FAQ';

const HomePage = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 20) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 20) {
            setShowScroll(false)
        }
    };

    async function getAllFilters() {
        try {
            const res = await axios.get(getAllFiltersApi);
            if (res.status === 200) {
                const filters = [{ name: "Category", data: res.data.data[0] }, { name: "Diamond", data: res.data.data[1] }];
                localStorage.setItem("KrivaFilters", JSON.stringify(filters));
            }
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong !", {
                position: "top-right"
            });
        }
    }

    useEffect(() => {
        getAllFilters();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");


    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className="homePage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <Header />
            <Category />
            <ShopByDiamond />
            <TopSellingItems />
            {/* <CustomizeJewellery />
            <FAQ />
            <Services />
            <Footer /> */}
        </div>
    )
}

export default HomePage;