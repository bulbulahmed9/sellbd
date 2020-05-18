import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Profile = ({ profile }) => {

    let email = profile ? profile.email || profile.googleEmail || profile.facebookEmail : null

    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-header">
                    <h3>User Profile</h3>
                </div>
                <div className="card-body">
                    <h4 className="my-3">Welcome {profile.name} </h4>
                    {email !== null && <h6>Your Email : {email} </h6>}
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="!#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>

    )
}

Profile.prototypes = {
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.auth.profile
})

export default connect(mapStateToProps)(Profile)
