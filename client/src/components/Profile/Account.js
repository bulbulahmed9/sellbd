import React from 'react'
import "./Profile.scss"
import {  Row, Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const Profile = ({ history }) => {

    const btnHandler = () => {
        history.push("/post-ad")
    }

    return (
        <>
            <div className="account">
                <Row>
                    <Col>
                        <h6>Kamal</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="account-content">
                            <p>You don't have any ads yet.</p>
                            <p>Click the "Post an ad now!" button to post your ad.</p>
                            <button onClick={() => btnHandler()} to="post-ad">Post an ad now</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default withRouter(Profile)
