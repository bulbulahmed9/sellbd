import React from 'react'
import {Link} from 'react-router-dom'
import notFoundimg from '../../shared/img/404.png'

const NotFound = () => {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={notFoundimg} alt="not-found" />
                <Link className="ml-5" style={{ fontSize: "30px", color: "#000000" }} to="/">Go to Home</Link>
            </div>
        </div>
    )
}

export default NotFound
