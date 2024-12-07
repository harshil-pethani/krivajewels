import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { bucketURL, recent5ProductApi } from '../Config/API_constant';
import apiRequest from '../CommonUtil';
import ProductsContainer from './ProductsContainer';

const TopSellingItems = () => {
    const navigate = useNavigate();
    const [newArrivals, setNewArrivals] = useState([]);
    const [materialChange, setMaterialChange] = useState({});


    useEffect(() => {
        // setIsLoading(true);
        async function getNewArrivals() {
            try {
                const data = await apiRequest(recent5ProductApi, 'GET');
                setNewArrivals(data?.products || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                // setIsLoading(false);
            }
        }
        getNewArrivals();
    }, []);

    return (
        <div id='topSelling' className="top-selling-component">
            <p className="section-title">
                New Arrivals
            </p>
            <ProductsContainer productData={newArrivals} materialChange={materialChange} setMaterialChange={setMaterialChange} />
            {/* <Link to={"/explore"}>
                View More <ion-icon name="arrow-forward"></ion-icon>
            </Link> */}
            <button onClick={() => { navigate("/explore") }} className="viewmore">
                View More <ion-icon name="arrow-forward"></ion-icon>
            </button>
        </div>
    )
}

export default TopSellingItems