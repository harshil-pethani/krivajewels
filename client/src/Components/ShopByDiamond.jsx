import React, { useEffect, useState } from 'react'
import apiRequest from '../CommonUtil';
import { bucketURL, getAllDiamondsApi } from '../Config/API_constant';
import { Link } from 'react-router-dom';
import { diamondSectionTitle } from '../Config/Static_data';

const ShopByDiamond = () => {
    const [diamonds, setDiamonds] = useState([]);

    useEffect(() => {
        async function getAllDiamonds() {
            try {
                const data = await apiRequest(getAllDiamondsApi, 'GET');
                setDiamonds(data?.data || []);
            } catch (error) {
            }
        }
        getAllDiamonds();
    }, []);

    return (
        <div className="diamondComponent">
            <p className="section-title">
                {diamondSectionTitle}
            </p>
            <div className="diamondContainer">
                {
                    diamonds.map((diamond, index) => (
                        diamond.title !== "noDiamond" &&
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