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
            <p className="title">
                New Arrivals
            </p>
            <ProductsContainer productData={newArrivals} materialChange={materialChange} setMaterialChange={setMaterialChange} />

            {/* <div className="jewellery-card-container">
                {
                    newArrivals.map((jewellery, index) => (

                        <div key={index} className="jewellery-card">
                            <Link to={`/explore/${jewellery._id}`} className="imgBox">
                                <img className="jewellery-image" src={
                                    materialChange[jewellery._id] === "rosegold"
                                        ? `${bucketURL}/${jewellery.roseGoldBannerImage}`
                                        : (materialChange[jewellery._id] === "silver" || materialChange[jewellery._id] === "whitegold")
                                            ? `${bucketURL}/${jewellery.silverBannerImage}`
                                            : `${bucketURL}/${jewellery.goldBannerImage}`} alt={jewellery.title} />
                            </Link>
                            <div className="card-details">
                                <div>
                                    <p className="jewellery-title" title={jewellery.title}>
                                        {jewellery.title}
                                    </p>
                                    <p className="jewellery-description">
                                        {jewellery.description}
                                    </p>
                                    <ul className="material-container">
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "gold" })} title='Yello Gold' className={`material gold ${(materialChange[jewellery._id] === "gold" || !materialChange[jewellery._id]) ? "active" : ""}`} >
                                        </li>
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "rosegold" })} title='Rose Gold' className={`material rosegold ${materialChange[jewellery._id] === "rosegold" ? "active" : ""}`}>
                                        </li>
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "whitegold" })} title='White Gold' className={`material whitegold ${materialChange[jewellery._id] === "whitegold" ? "active" : ""}`}>
                                        </li>
                                        <li onClick={() => setMaterialChange({ ...materialChange, [jewellery._id]: "silver" })} title='Silver' className={`material silver ${materialChange[jewellery._id] === "silver" ? "active" : ""}`}>
                                        </li>
                                    </ul>
                                </div>
                                <button className="inquiry-btn">
                                    Inquiry Now<ion-icon name="arrow-forward"></ion-icon>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div> */}
            <button onClick={() => { navigate("/explore") }} className="viewmore">
                View More <ion-icon name="arrow-forward"></ion-icon>
            </button>
        </div>
    )
}

export default TopSellingItems