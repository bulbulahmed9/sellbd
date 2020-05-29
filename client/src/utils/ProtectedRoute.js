import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { toast } from 'react-toastify'
// rafcp

const ProtectedRoute = ({
    component: Component,
    isAuth,
    ...rest
}) => {
    return (
        <Route {...rest} render={(props) => isAuth ? (<Component {...props} />) : (
        <Redirect to="/login" />)} />
    )
}

ProtectedRoute.prototypes = {
    isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(ProtectedRoute)
