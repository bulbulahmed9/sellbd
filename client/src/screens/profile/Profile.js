import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import 'moment-timezone';
import BigLoader from '../../components/loading/BigLoader'
import MiniLoader from '../../components/loading/MiniLoader'
import { loadUser } from '../../services/actions/authAction'
import { updatePhone } from '../../services/actions/profileAction'

const Profile = ({ profile, loadUser, updatePhone, loading }) => {

    useEffect(() => {
        loadUser()
    }, [loadUser, profile])

    let name = profile && profile.name
    let email = profile ? profile.email || profile.googleEmail || profile.facebookEmail : null
    let dateToFormat = profile && profile.createdAt

    const [openBox, setOpenBox] = useState(false)
    const [number, setNumber] = useState({
        number: ""
    })


    const handleNumberChange = (e) => {
        setNumber({
            number: e.target.value
        })
    }

    const toggleOpenBox = () => {
        setOpenBox(!openBox)
    }

    return (
        profile ? <div className="container my-5">
            <div className="card">
                <div className="card-header">
                    <h3>User Profile</h3>
                </div>
                <div className="card-body">
                    <h4 className="my-3">Welcome {name} </h4>
                    {email !== null && <h6>Email : {email} </h6>}
                    {profile.phone === undefined ? "" : <h6> Phone: {profile.phone} </h6>}

                    <button onClick={() => toggleOpenBox()} className="btn btn-info mt-3">  {profile.phone === undefined ? "Add Phone Number" : "Update Phone Number"}  {loading && <MiniLoader />} </button> <br />
                    {openBox && <div>
                        <input value={number.number} onChange={(e) => handleNumberChange(e)} className="mt-3 form-control" placeholder="Enter Phone number" />
                        <button onClick={() => {
                            updatePhone(number.number)
                            toggleOpenBox()
                        }
                        } className="btn btn-info mt-3">Update</button>
                    </div>}
                    <p className="card-text mt-3"> Member Since <Moment format="DD/MM/YYYY">{dateToFormat}</Moment> </p>
                </div>
            </div>
        </div> : <BigLoader />

    )
}

Profile.prototypes = {
    profile: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    updatePhone: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
    profile: state.auth.profile,
    loading: state.profileReducer.loading
})

export default connect(mapStateToProps, { loadUser, updatePhone })(Profile)
