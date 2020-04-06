import React, { Fragment } from 'react'
import './rules.scss'
import { Container, Row, Col } from 'react-bootstrap'


const Rules = () => {
    return (
        <Fragment>
            <Container>
                <div className="rules">
                    <h4>জরুরি নিয়ম</h4>
                    <h5>BikeBazar BD এ পোস্ট হওয়া সকল বিজ্ঞাপন অবশ্যই আমাদের নিয়মাবলী অনুযায়ী হতে হবে:</h5>
                    <Row>
                        <Col>
                            <div className="rules-list">
                                <p>অবশ্যই বিজ্ঞাপনটি সঠিক শ্রেনী দিয়েছেন কিনা খেয়াল করুন।</p>
                                <p>অনুগ্রহ করে একই বিজ্ঞাপন ৭ দিনের মধ্যে পুনরায় অথবা একাধিকবার পোস্ট করবেন না।</p>
                                <p>জলছাপ যুক্ত ছবি আপলোড করবেন না।</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="rules-list">
                                <p>প্যাকেজ ডিল ছাড়া একই বিজ্ঞাপনে একের বেশী পণ্যের বিবরণ দিবেন না।</p>
                                <p>আপনার ইমেইল অ্যাড্রেস বা ফোন নাম্বার বিজ্ঞাপনের শিরোনাম বা বিবরনে ব্যবহার করবেন না।</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    )
}

export default Rules
