import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import apiRequest from '../CommonUtil';
import { logoutApi } from '../Config/API_constant';

const AdminSide = ({ setAdminLogged }) => {
    const [activeMenu, setActiveMenu] = useState("");
    const location = useLocation();

    useEffect(() => {
        setActiveMenu(location.pathname.split('/')[2]);
    }, [location]);

    const handleLogout = async () => {
        try {
            const data = await apiRequest(logoutApi, 'GET', null, { withCredentials: true });
            setAdminLogged(false);
            window.location.reload();
        } catch (e) {
        }
    }

    return (
        <div className="adminSide">
            <div className="menus">
                <div className="topMenus">
                    <Link to={`/admin/categories`} className={activeMenu === "categories" ? "link menuActive" : "link"} >
                        <ion-icon name="grid-outline"></ion-icon>
                        Categories
                    </Link>
                    <Link to={`/admin/diamonds`} className={activeMenu === "diamonds" ? "link menuActive" : "link"} >
                        <ion-icon name="storefront-outline"></ion-icon>
                        Diamonds
                    </Link>
                    <Link to={`/admin/products`} className={activeMenu === "products" ? "link menuActive" : "link"} >
                        <ion-icon name="storefront-outline"></ion-icon>
                        Products
                    </Link>

                </div>


                <div className="bottomMenus">
                    <div className="subMenu">
                        <Link to="/admin/settings" className={activeMenu === "settings" ? "link menuActive" : "link"} onClick={() => {
                            setActiveMenu("settings")
                        }
                        }>
                            <ion-icon name="settings-outline"></ion-icon>
                            Settings
                        </Link>
                    </div>
                    <div className="subMenu">
                        <div onClick={handleLogout} className="link">
                            <ion-icon name="nuclear-outline"></ion-icon>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSide