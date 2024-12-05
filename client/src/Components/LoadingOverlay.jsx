import React from 'react';
import { useLoader } from '../Contexts/LoaderContext';

const LoadingOverlay = () => {
    const { loading } = useLoader();

    if (!loading) return null;

    return (
        <div className="loader-overlay">
            <div className="loader"></div>
        </div>
    );
};

export default LoadingOverlay;
