import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import "./Login.css";
import { MdDirectionsBike } from "react-icons/md";

const NewLogin = () => {
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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                          <p className="login-title">
                            Bike Bazar BD <MdDirectionsBike />{" "}
                          </p>
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
                              autoComplete="off"
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
                              autoComplete="off"
                            />
                            {errors.password && touched.password && (
                              <p className="error">{errors.password}</p>
                            )}
                          </div>
                          <button type="submit" className="login-btn">
                            Sign In
                        </button>
                          <Link
                            style={{
                              marginLeft: "20px",
                              marginTop: "15px",
                              color: "#ffffff"
                            }}
                            to="/"
                          >
                            Back to Home
                        </Link>
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

export default NewLogin;
