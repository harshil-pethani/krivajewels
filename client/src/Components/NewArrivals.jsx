import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { recent5ProductApi } from '../Config/API_constant';
import apiRequest from '../CommonUtil';
import ProductsContainer from './ProductsContainer';
import { newArrivalsSectionTitle } from '../Config/Static_data';

const NewArrivals = () => {
    const navigate = useNavigate();
    const [newArrivals, setNewArrivals] = useState([]);
    const [materialChange, setMaterialChange] = useState({});

    useEffect(() => {
        async function getNewArrivals() {
            try {
                const data = await apiRequest(recent5ProductApi, 'GET');
                setNewArrivals(data?.products || []);
            } catch (error) {
            }
        }
        getNewArrivals();
    }, []);

    return (
        <div id='topSelling' className="top-selling-component">
            <p className="section-title">
                {newArrivalsSectionTitle}
            </p>
            <ProductsContainer homepage={true} productData={newArrivals} materialChange={materialChange} setMaterialChange={setMaterialChange} />
            <button onClick={() => { navigate("/explore") }} className="viewmore">
                View More <ion-icon name="arrow-forward"></ion-icon>
            </button>
        </div>
    )
}

export default NewArrivals