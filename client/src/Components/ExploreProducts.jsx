import React, { useRef, useState } from 'react'
import { getAllProductApi } from '../Config/API_constant';
import apiRequest from '../CommonUtil';
import Loader from './Loader';
import ProductsContainer from './ProductsContainer';
import FilterContainer from './FilterContainer';

const ExploreProducts = () => {
    const isFetching = useRef(false);
    const [page, setPage] = useState(1);
    const [materialChange, setMaterialChange] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([[], [], []]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreProduct, setHasMoreProduct] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const initialCall = useRef(true);

    async function getAllProducts(searchQuery = "") {
        if (isFetching.current) return;
        if (initialCall.current) {
            initialCall.current = false;
        }
        isFetching.current = true;
        setIsLoading(true);
        try {
            const categoryFilters = selectedOptions[0].map((filter) => (filter._id));
            const diamondFilters = selectedOptions[1].map((filter) => (filter._id));
            const subCategoryFilters = selectedOptions[2].map((filter) => (filter._id));
            const apiPath = getAllProductApi + `?page=${page}&limit=10&searchQuery=${searchQuery}`;

            const data = await apiRequest(apiPath, 'POST', { filters: [categoryFilters, diamondFilters, subCategoryFilters] });
            setProducts((prev) => [...prev, ...data.products]);
            setHasMoreProduct(data.hasMoreProduct);
        } catch (error) {
        } finally {
            isFetching.current = false;
            setIsLoading(false);
        }
    }

    const loadMore = () => {
        try {
            if (hasMoreProduct) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
        }
    };

    return (
        <div id='topSelling' className="explore-product-component">
            <p className="section-title">
                Explore Jewelleries
            </p>
            <span className="subtitle">
                (1000+ Jewelleries)
            </span>
            <FilterContainer
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                setProducts={setProducts}
                page={page}
                setPage={setPage}
                hasMoreProduct={hasMoreProduct}
                setHasMoreProduct={setHasMoreProduct}
                setIsLoading={setIsLoading}
                getAllProducts={getAllProducts}
                initialCall={initialCall}
            />
            <ProductsContainer productData={products} materialChange={materialChange} setMaterialChange={setMaterialChange} isLoading={isLoading} />
            {isLoading && <Loader />}
            {
                hasMoreProduct && (
                    <button style={{ marginTop: "10px" }} onClick={loadMore}>
                        Load More <ion-icon name="arrow-forward"></ion-icon>
                    </button>)
            }
        </div>
    )
}

export default ExploreProducts