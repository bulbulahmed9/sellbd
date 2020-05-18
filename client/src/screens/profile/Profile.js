import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import 'moment-timezone';
import BigLoader from '../../components/loading/BigLoader'


const Profile = ({ profile }) => {

    let name = profile && profile.name
    let email = profile ? profile.email || profile.googleEmail || profile.facebookEmail : null
    let dateToFormat = profile && profile.createdAt

    return (
        profile ? <div className="container my-5">
            <div className="card">
                <div className="card-header">
                    <h3>User Profile</h3>
                </div>
                <div className="card-body">
                    <h4 className="my-3">Welcome {name} </h4>
                    {email !== null && <h6>Your Email : {email} </h6>}
                    <a href="!#" className="btn btn-primary">Go somewhere</a>
                    <p className="card-text mt-3"> Member Since <Moment format="DD/MM/YYYY">{dateToFormat}</Moment> </p>
                </div>
            </div>
        </div> : <BigLoader />

    )
}

Profile.prototypes = {
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.auth.profile
})

export default connect(mapStateToProps)(Profile)
