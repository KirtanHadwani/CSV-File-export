import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const message = searchParams.get("message");
    if (message === "Register Success") {
      toast.success("Successfully Registered");
    }
  }, [location]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");

    let userLogin = {
      email: email,
      password: password,
    };
    let response = await fetch(
      "https://login-reactapi.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLogin),
      }
    );

    const res = await response.json();
    // console.log(res.data.token);

    if (res.message == "Admin logged in successfully") {
      const data = res.data.token;
      console.log("successfully logged in");
      console.log("tokennnnnnnn", data);
      localStorage.setItem("token", data);

      if (rememberMe) {
        localStorage.setItem("token", data);
      }
      toast.success('Login Success!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(()=>{
        navigate("/data");
      },1000)
    } else {
      console.log("invalid credentials!");
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (email.length == 0 || password.length == 0) {
      setEmailErr(true);
      setPasswordErr(true);
    }
  };

  function emailHandler(e) {
    let item = e.target.value;
    var emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (item.match(emailRegex)) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
    setEmail(item);
  }
  function passwordHandler(e) {
    let item = e.target.value;
    if (item.length < 8) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
    setPassword(item);
  }

  return (
    <div>
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div className={classes.loginImg}>
          <img src="/assets/reg2.jpg" alt="img" />
        </div>
        <div className="col-md-5 p-5 shadow-lg border rounded-5  bg-white">
          <h2 className="text-center mb-4 text-primary">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control "
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={emailHandler}
                value={email}
              />
              {emailErr ? (
                <span className={classes.errorMsg}>Email Not Valid</span>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control "
                id="exampleInputPassword1"
                onChange={passwordHandler}
                value={password}
              />
              {passwordErr ? (
                <span className={classes.errorMsg}>Password Not Valid</span>
              ) : (
                ""
              )}
            </div>
            <div className="form-check">
              <label className="form-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
            </div>
            <p className="small">
              <a className="text-primary" href="forget-password.html">
                Forgot password?
              </a>
            </p>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              <ToastContainer autoClose={2000} />
            </div>
          </form>
          <div className="mt-3">
            <p className="mb-0  text-center" style={{ color: "black" }}>
              Don't have an account? &nbsp; &nbsp;
              <Link to="/register">
                <a href="" className="text-primary fw-bold">
                  Sign up
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
