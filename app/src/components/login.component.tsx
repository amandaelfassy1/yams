import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../services/auth.service";
import { RootState, setUser } from "../reducers/store";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const user = useSelector((state:RootState)=> state.user)
  
  useEffect(() => {
    // console.log(user);
    
    // if (user && user.username != ""){
    //   navigate('/home')
    // }
  }, []);

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string().email("Invalid email").required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  };

  const handleLogin = (formValue) => {
    const { email, password } = formValue;

    setMessage("");
    setLoading(true);

    AuthService.signin(email, password)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.token);
        dispatch(setUser(response.user))
        setLoading(false);
        navigate("/home");

      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="form-content mt-5 p-5">
      <div className="rounded">
        <img
          src="../../public/avatar.jpg"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <Field
                name="password"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
