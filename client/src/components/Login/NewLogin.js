import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import "./NewLogin.css";
import { MdDirectionsBike } from "react-icons/md";

const NewLogin = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phone: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          // else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = "Invalid email address";
          // }
          if (!values.phone) {
            errors.phone = "Phone is required";
          } else if (!/^\+?(88)?0?1[3456789][0-9]{8}\b/i.test(values.phone)) {
            errors.phone = "Invalid phone number";
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
                        <button className="fb">
                          Log in with Facebook
                        </button>
                        <button className="email">
                          Log in with Gmail
                        </button>
                        <div className="name-section">
                          <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            autoComplete="off"
                          />
                          {errors.name && touched.name && (
                            <p className="error">{errors.name}</p>
                          )}
                        </div>
                        <div className="phone-section">
                          <input
                            type="number"
                            placeholder="Phone Number"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            autoComplete="off"
                          />
                          {errors.phone && touched.phone && (
                            <p className="error">{errors.phone}</p>
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
