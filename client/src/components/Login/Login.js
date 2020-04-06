import React from "react";
import { Container } from "react-bootstrap";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
  return (
    <Container>
      <div className="login-form">
        <h4>Log in</h4>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password.length < 6) {
              errors.password = "Password should be atleast six digit";
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
            <form onSubmit={handleSubmit}>
              <button className="fb">Log in with Facebook</button>
              <button className="email">Log in with Email</button>
              <p>Or</p>
              <div className="email-section">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && <p>{errors.email}</p>}
              </div>
              <div className="password-section">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <p>{errors.password}</p>
                )}
              </div>
              <button type="submit" className="login">
                Login
              </button>
              <a className="forgot-pass" href="#!">
                Forgot Your Password
              </a>
              <p className="not-member">
                Not a member? <Link to="/signup">Sign Up Here</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
