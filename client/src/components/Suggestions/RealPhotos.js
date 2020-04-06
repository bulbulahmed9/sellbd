import React from 'react'
import { Card } from 'react-bootstrap'

const RealPhotos = () => {
    return (
        <>
            <Card bg="secondary ml-3" text="white" style={{ width: '18rem', height: '170px' }}>
                <Card.Body>
                <Card.Text>
                    <h5>Use real photos!</h5>
                    <p>Ads with real photos get 10 times more views than with catalogue images.Do not upload images with watermarks.</p>
                </Card.Text>
                </Card.Body>
            </Card>  
        </>
    )
}

export default RealPhotos
