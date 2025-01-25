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
import { toast } from 'react-toastify';
import { braceletFilters, earringFilters, necklaceFilters, pendantsFilters, ringFilters } from '../Config/Static_data';


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
            const filters = [
                { name: "Category", disabled: false, data: res.data[0] },
                { name: "Diamond", disabled: false, data: res.data[1] },
                { name: "Sub Category", disabled: true, data: [] }
            ];
            sessionStorage.setItem("KrivaFilters", JSON.stringify(filters));
        } catch (e) {
            toast.error("Something went wrong !", {
                position: "top-right"
            });
        }
    }

    useEffect(() => {
        getAllFilters();
        sessionStorage.setItem("KrivaRingFilters", JSON.stringify(ringFilters));
        sessionStorage.setItem("KrivaEarringFilters", JSON.stringify(earringFilters));
        sessionStorage.setItem("KrivaPendantFilters", JSON.stringify(pendantsFilters));
        sessionStorage.setItem("KrivaBraceletFilters", JSON.stringify(braceletFilters));
        sessionStorage.setItem("KrivaNecklaceFilters", JSON.stringify(necklaceFilters));
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