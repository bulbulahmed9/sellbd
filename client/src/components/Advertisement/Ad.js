import React from 'react'

import ad from '../../StaticImage/ad-1.PNG'

const Ad = () => {
    return (
        <div className="ad container" style={{textAlign: 'center', marginBottom: '80px'}}>
            <img src={ad} alt="ad" />
        </div>
    )
}

export default Ad
