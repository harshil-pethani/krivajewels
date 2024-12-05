import React, { useEffect, useState } from 'react'
import apiRequest from '../CommonUtil';
import { bucketURL, getAllDiamondsApi } from '../Config/API_constant';
import { Link } from 'react-router-dom';

const ShopByDiamond = () => {
    const [diamonds, setDiamonds] = useState([]);
    useEffect(() => {
        // setIsLoading(true);
        async function getAllDiamonds() {
            try {
                const data = await apiRequest(getAllDiamondsApi, 'GET');
                setDiamonds(data?.data || []);
            } catch (error) {
                console.error('Failed to fetch diamonds:', error);
            } finally {
                // setIsLoading(false);
            }
        }
        getAllDiamonds();
    }, []);

    return (
        <div className="diamondComponent">
            <p className="title">
                Shop By diamonds
            </p>
            <div className="diamondContainer">
                {
                    diamonds.map((diamond, index) => (
                        diamond._id !== "673e22a5c22422f32e3b01b9" &&
                        <Link to={`/explore?diamond=${diamond?._id}`} key={index} className="diamondBox">
                            <div className="imgBox">
                                <img className="diamondImage" src={`${bucketURL}/${diamond.diamondImage}`} alt={diamond.title} />
                            </div>
                            <p className="diamondTitle">
                                {diamond.title}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ShopByDiamond;