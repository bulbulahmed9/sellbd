import React, { useEffect } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../services/actions/authAction'
import "./login.css";
import MiniLoader from "../../components/loading/MiniLoader";

const Login = ({ login, history, isAuth, authLoading }) => {

  useEffect(() => {
    if (isAuth === true) {
      history.push('/profile')
    }
  }, [isAuth, history])

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          }
          else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be equal or greater than 6 characters";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password } = values
          login({ email, password }, history)
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-overlay">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="login-left">
                        <div className="login-left-overlay">
                          <a className="fb" href="/auth/facebook"> Log in with Facebook</a>
                          <a className="email" href="/auth/google"> Log in with Gmail</a>
                          <div className="name-section">
                            <input
                              type="email"
                              placeholder="Enter Email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            {errors.email && touched.email && (
                              <p className="error">{errors.email}</p>
                            )}
                          </div>
                          <div className="phone-section">
                            <input
                              type="password"
                              placeholder="Enter Password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            {errors.password && touched.password && (
                              <p className="error">{errors.password}</p>
                            )}
                          </div>
                          <button type="submit" className="login-btn">
                            Log in {authLoading && <MiniLoader />}
                          </button>
                          <p className="ml-5" style={{ color: "#ffffff" }}>Not a member? <Link style={{ color: "#ffffff" }} to="/register">Register here</Link></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </form>
          )}
      </Formik>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authLoading: state.auth.loading,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);
