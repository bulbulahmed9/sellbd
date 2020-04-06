import React, {  useState } from "react";
import { Container } from "react-bootstrap";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./signup.scss";

const Signup = () => {

  // toast notification
  const signupSuccess = () => toast.success("success");

  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <div className="signup-form">
        <h4>Sign up</h4>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            password2: ""
          }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is required";
            }
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
            if (!values.password2) {
              errors.password2 = "Confirm password is required";
            } else if (values.password !== values.password2) {
              errors.password2 = "Password does not match";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setLoading(true);
            setTimeout(() => {
              signupSuccess();
              setSubmitting(false);
              setLoading(false);
            }, 1000);
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
              <div className="name-section">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && <p>{errors.name}</p>}
              </div>
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
              <div className="passwordtwo-section">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password2}
                />
                {errors.password2 && touched.password2 && (
                  <p>{errors.password2}</p>
                )}
              </div>
              <button type="submit" className="signup">
                Signup
              </button>
              {loading && <p>loading ...</p>}
              <p className="already-member">
                Already member? <Link to="/login">Log in Here</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Signup;
