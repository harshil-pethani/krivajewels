import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FilterContainer = ({ searchQuery = { searchQuery }, setSearchQuery = { setSearchQuery }, selectedOptions, setSelectedOptions, setProducts, page, setPage, hasMoreProduct, setHasMoreProduct, setIsLoading, getAllProducts, initialCall }) => {

    const dropdownRefs = useRef([null, null]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [filters, setFilters] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const localFilters = JSON.parse(sessionStorage.getItem("KrivaFilters"));
        setFilters([...localFilters]);
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");
        const diamond = queryParams.get("diamond");
        if (category && initialCall.current) {
            const newSelectedOptions = [...selectedOptions];
            let categoryData = localFilters[0].data.find((opt) => opt._id === category);
            newSelectedOptions[0].push(categoryData);
            setSelectedOptions(newSelectedOptions);
        }
        if (diamond && initialCall.current) {
            const newSelectedOptions = [...selectedOptions];
            let diamondData = localFilters[1].data.find((opt) => opt._id === diamond);
            newSelectedOptions[1].push(diamondData);
            setSelectedOptions(newSelectedOptions);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        setProducts([]);
        setHasMoreProduct(true);
        if (page === 1 && !initialCall.current) {
            getAllProducts(searchQuery);
            return;
        }
        setPage(1);
    }, [debouncedSearchQuery]);

    useEffect(() => {
        if (hasMoreProduct) {
            setIsLoading(true);
            getAllProducts(searchQuery);
        }
    }, [page]);

    const checkObjectInArray = (arr, newObj) => {
        const index = arr.findIndex(obj => obj._id === newObj._id);
        return index;
    };

    const handleDropdownToggle = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRefs.current &&
            dropdownRefs.current.every(
                (ref, index) => !ref || (index !== openDropdown && !ref.contains(event.target))
            )
        ) {
            setOpenDropdown(null);
        }
    };

    const onOptionSelect = (index, option, remove = false) => {
        const newSelectedOptions = [...selectedOptions];
        let findFilterIndex = checkObjectInArray(newSelectedOptions[index], option);

        if (index === 0) appendSubCategoryData(option.title);

        if (remove) {
            findFilterIndex !== -1 && newSelectedOptions[index].splice(findFilterIndex, 1);
        } else {
            if (findFilterIndex === -1) {
                if (index === 0) {
                    newSelectedOptions[2].length = 0;
                    newSelectedOptions[index].length === 0
                        ? newSelectedOptions[index].push(option)
                        : newSelectedOptions[index][0] = option;
                } else {
                    newSelectedOptions[index].push(option);
                }
                console.log(newSelectedOptions);
            }
        }

        setSelectedOptions(newSelectedOptions);
        setProducts([]);
        setHasMoreProduct(true);
        if (page === 1) {
            setIsLoading(true);
            getAllProducts(searchQuery);
        } else {
            setPage(1);
        }
        setOpenDropdown(null);
    };

    const appendSubCategoryData = (categoryTitle) => {
        if (categoryTitle.toLowerCase() === "ring") {
            const ringFilterData = JSON.parse(sessionStorage.getItem("KrivaRingFilters"));
            setFilters((prevState) =>
                prevState.map((filter, index) =>
                    index === 2
                        ? { ...filter, disabled: false, data: ringFilterData }
                        : filter
                )
            );
        } else if (categoryTitle.toLowerCase() === "earrings") {
            const earringFilterData = JSON.parse(sessionStorage.getItem("KrivaEarringFilters"));
            setFilters((prevState) =>
                prevState.map((filter, index) =>
                    index === 2
                        ? { ...filter, disabled: false, data: earringFilterData }
                        : filter
                )
            );
        } else if (categoryTitle.toLowerCase() === "pendants") {
            const pendantsFilterData = JSON.parse(sessionStorage.getItem("KrivaPendantFilters"));
            setFilters((prevState) =>
                prevState.map((filter, index) =>
                    index === 2
                        ? { ...filter, disabled: false, data: pendantsFilterData }
                        : filter
                )
            );
        } else if (categoryTitle.toLowerCase() === "bracelet") {
            const braceletFilterData = JSON.parse(sessionStorage.getItem("KrivaBraceletFilters"));
            setFilters((prevState) =>
                prevState.map((filter, index) =>
                    index === 2
                        ? { ...filter, disabled: false, data: braceletFilterData }
                        : filter
                )
            );
        } else if (categoryTitle.toLowerCase() === "necklace") {
            const necklaceFilterData = JSON.parse(sessionStorage.getItem("KrivaNecklaceFilters"));
            setFilters((prevState) =>
                prevState.map((filter, index) =>
                    index === 2
                        ? { ...filter, disabled: false, data: necklaceFilterData }
                        : filter
                )
            );
        } else {
            setFilters((prevState) =>
                prevState.map((filter, index) =>
                    index === 2
                        ? { ...filter, disabled: true }
                        : filter
                )
            );
        }
    }

    const resetFilters = () => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[0].length = 0;
        newSelectedOptions[1].length = 0;
        newSelectedOptions[2].length = 0;
        setSelectedOptions(newSelectedOptions);
        setProducts([]);
        setHasMoreProduct(true);
        if (page === 1) {
            setIsLoading(true);
            getAllProducts(searchQuery);
        } else {
            setPage(1);
        }
    };

    const isAnyFilterSelected = selectedOptions.some(option => option.length !== 0);

    return (
        <>
            <div className="filterContainer">
                {
                    filters?.length > 0 && filters[0].data?.length > 0 &&
                    <div className="filter">
                        <div className="leftPart">
                            <div className="searchBox">
                                {/* <ion-icon name="search"></ion-icon> */}
                                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={() => { }} type="text" placeholder="Search for Gold, Diamonds and other jewelleries..." />
                                <button>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="centerPart">
                            <div className="dropdowns-container">
                                {
                                    filters.map((curFilter, index) => (
                                        <div
                                            key={index}
                                            ref={(el) => (dropdownRefs.current[index] = el)}
                                            className="dropDown"
                                        >
                                            <button onClick={() => !curFilter.disabled && handleDropdownToggle(index)} className={curFilter.disabled === true ? "dropDown-Btn disabled" : "dropDown-Btn"}>
                                                {curFilter.name}
                                                {curFilter.disabled}
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_854_42)">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 15.7064C12.5196 15.8938 12.2653 15.9992 12.0001 15.9992C11.7349 15.9992 11.4806 15.8938 11.2931 15.7064L5.6361 10.0494C5.54059 9.95712 5.46441 9.84678 5.412 9.72477C5.35959 9.60277 5.332 9.47155 5.33085 9.33877C5.32969 9.20599 5.355 9.07431 5.40528 8.95141C5.45556 8.82852 5.52981 8.71686 5.6237 8.62297C5.7176 8.52908 5.82925 8.45483 5.95214 8.40454C6.07504 8.35426 6.20672 8.32896 6.3395 8.33012C6.47228 8.33127 6.6035 8.35886 6.7255 8.41126C6.84751 8.46367 6.95785 8.53986 7.0501 8.63537L12.0001 13.5854L16.9501 8.63537C17.1387 8.45321 17.3913 8.35241 17.6535 8.35469C17.9157 8.35697 18.1665 8.46214 18.3519 8.64755C18.5373 8.83296 18.6425 9.08377 18.6448 9.34597C18.6471 9.60816 18.5463 9.86076 18.3641 10.0494L12.7071 15.7064Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_854_42">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </button>
                                            {openDropdown === index && (
                                                <div className="dropDown-content">
                                                    <ul>
                                                        {
                                                            curFilter.data.map((option, ind) => (
                                                                <li key={option._id} onClick={() => onOptionSelect(index, option)} className="dropDown-item">
                                                                    <span>{option.title}</span>
                                                                    {
                                                                        checkObjectInArray(selectedOptions[index], option) !== -1 &&
                                                                        <ion-icon name="checkmark"></ion-icon>
                                                                    }
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    <div className="filter-actions">
                        <div className='appliedFiltersContainer'>

                            {
                                selectedOptions.map(
                                    (option, index) => (
                                        <div className="appliedCategoryFilter" key={`${index}`}>
                                            {
                                                option?.map((subOption) => (
                                                    <div key={subOption._id} className="appliedFilter">
                                                        <span>
                                                            {subOption.title}
                                                        </span>
                                                        <ion-icon name="close" onClick={() => { onOptionSelect(index, subOption, true) }}></ion-icon>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                )
                            }
                        </div>
                        {isAnyFilterSelected && (
                            <button onClick={resetFilters} className="reset-button">
                                Reset Filters
                            </button>
                        )}
                    </div>
                }
            </div>
            {
                debouncedSearchQuery &&
                <p className="searchResultText">
                    Showing results for : <span> {debouncedSearchQuery} </span>
                </p>
            }
        </>
    )
}

export default FilterContainer;