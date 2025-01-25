import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminTop = ({ adminDetails }) => {
    const navigate = useNavigate();
    return (
        <div className="adminTop">
            <div className="leftNav">
                <Link to="/">
                    KRIVA JEWELS
                </Link>
            </div>
            <div className="profile" onClick={() => navigate("/admin/settings")}>
                <div className="userImage">
                    <ion-icon name="person"></ion-icon>
                </div>
                <h2 className="title">
                    {adminDetails?.username}
                </h2>
            </div>
        </div>
    )
}

export default AdminTop