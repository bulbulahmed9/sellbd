import React from 'react'
import spinner from '../../shared/img/spinner.jpg'

function BigLoader() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ height: "190px", width: "250px", margin: "200px" }} src={spinner} alt="Loading..." />
        </div>
    )
}

export default BigLoader
