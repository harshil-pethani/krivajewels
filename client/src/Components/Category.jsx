import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import apiRequest from '../CommonUtil';
import { bucketURL, getAllCategoriesApi } from '../Config/API_constant';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        async function getAllCategories() {
            try {
                const data = await apiRequest(getAllCategoriesApi, 'GET');
                setCategories(data?.data || []);
                let x = [];
                for (let i = 0, catLength = data?.data.length; i < catLength; i++) {
                    x[data?.data[i]._id] = `${bucketURL}/${data?.data[i].categoryImage}?cacheBust=${Math.random()}`;
                };
                setImageUrls(x);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
            }
        }
        getAllCategories();
    }, []);

    return (
        <div id='category' className="categoryComponent">
            <p className="section-title">
                Shop By Categories
            </p>
            <div className="categoryContainer">
                {
                    categories.map((category, index) => (
                        <Link to={`/explore?category=${category?._id}`} key={index} className="categoryBox">
                            <div className="imgBox">
                                <img className="categoryImage" src={imageUrls[category._id]} alt={category.title} />
                            </div>
                            <p className="categoryTitle">
                                {category.title}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Category