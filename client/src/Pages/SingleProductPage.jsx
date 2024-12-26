import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer';
import { singleProductApi } from '../Config/API_constant';
import ScrollToTopArrow from '../Components/ScrollToTopArrow';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import apiRequest from '../CommonUtil';
import SingleProduct from '../Components/SingleProduct';

const SingleProductPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [productId, setProductId] = useState("");
    const [productData, setProductData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setProductId(location.pathname.split("/")[2]);
    }, [location]);

    async function findProduct() {
        try {
            setIsLoading(true);
            const res = await apiRequest(`${singleProductApi}/${productId}`, 'GET');
            setProductData(res?.product);
        } catch (e) {
            // console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        productId && findProduct();
    }, [productId]);

    return (
        <div className="homePage" style={{ position: "relative" }}>
            <ScrollToTopArrow />
            <Navbar />
            {isLoading ? <Loader /> : <SingleProduct productData={productData} />}
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default SingleProductPage;