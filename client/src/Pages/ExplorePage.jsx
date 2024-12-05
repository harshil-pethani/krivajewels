import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ExploreProducts from '../Components/ExploreProducts';
import { getAllFiltersApi } from '../Config/API_constant';
import axios from 'axios';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import { ToastContainer, toast } from 'react-toastify';

const ExplorePage = () => {
    // const [filters, setFilters] = useState([{}, {}]);
    const [searchQuery, setSearchQuery] = useState("");

    // useEffect(() => {
    //     // async function getAllFilters() {
    //     //     try {
    //     //         const res = await axios.get(getAllFiltersApi);
    //     //         if (res.status === 200) {
    //     //             setFilters([{ name: "Category", data: res.data.data[0] }, { name: "Diamond", data: res.data.data[1] }]);
    //     //         }
    //     //     } catch (e) {
    //     //         console.log(e);
    //     //         toast.error("Something went wrong !", {
    //     //             position: "top-right"
    //     //         });
    //     //     }
    //     // }
    //     // getAllFilters();
    //     const filters = localStorage.getItem("KrivaFilters");
    //     setFilters(filters);
    // }, []);

    const notify = () => {
        // toast("Default Notification !");

        // toast.success("Success Notification !", {
        //     position: "top-center"
        // });

        // toast.error("Error Notification !", {
        //     position: "top-left"
        // });

        // toast.warn("Warning Notification !", {
        //     position: "bottom-left"
        // });

        // toast.info("Info Notification !", {
        //     position: "bottom-center"
        // });

        toast("Custom Style Notification with css class!", {
            position: "bottom-right",
            className: 'foo-bar'
        });
    };

    return (
        <div className="homePage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar sendSearchQuery={(queryString) => { setSearchQuery(queryString); }} />
            <Header ExplorePage={true} />
            <ExploreProducts searchQuery={searchQuery} />
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default ExplorePage;