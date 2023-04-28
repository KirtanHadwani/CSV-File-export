import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [file, setFile] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [fnameErr, setFnameErr] = useState();
  const [lnameErr, setLnameErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const [confirmpasswordErr, setConfirmPasswordErr] = useState();
  const [dobErr, setDobErr] = useState();
  const [fileErr, setFileErr] = useState();
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    if (fname == "") {
      setFnameErr("Field can't be empty");
    }
    if (lname == "") {
      setLnameErr("Field can't be empty");
    }
    if (email == "") {
      setEmailErr("Field can't be empty");
    }
    if (password == "") {
      setPasswordErr("Field can't be empty");
    }
    if (confirmpassword == "") {
      setConfirmPasswordErr("Field can't be empty");
    }
    if (dob == "") {
      setDobErr("Field can't be empty");
    }
    if (file == "") {
      setFileErr("Field can't be empty");
    }

    event.preventDefault();
    let userRegister = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      confirmPassword: confirmpassword,
      dob: dob,
    };
    let response = await fetch(
      "https://login-reactapi.onrender.com/api/admin/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(userRegister),
      }
    );

    const res = await response.json();

    if (password !== confirmpassword) {
      setConfirmPasswordErr("Password doesn't match");
    } else {
      console.log(userRegister);
    }
    if (response.status === 200) {
      console.log("successfully registered");
      toast.success("Registered Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/Login?message=Register%20Success");
    } else {
      console.log("invalid credentials!");
      toast.error(res.result.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  function fnameHandler(e) {
    if (e.target.value === "") {
      setFnameErr("Can't be empty");
    } else if (e.target.value.match(/[0-9]/)) {
      setFnameErr("First Name does not contain Numbers");
    } else {
      setFnameErr("");
      setFname(e.target.value);
    }
  }

  function lnameHandler(e) {
    if (e.target.value === "") {
      setLnameErr("Can't be empty");
    } else if (e.target.value.match(/[0-9]/)) {
      setLnameErr("Last Name does not contain Numbers ");
    } else {
      setLnameErr("");
      setLname(e.target.value);
    }
  }

  function emailHandler(e) {
    if (e.target.value === "") {
      setEmailErr("Can't be empty");
    } else if (
      !e.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailErr("Email is not valid");
    } else {
      setEmailErr("");
      setEmail(e.target.value);
    }
  }
  function passwordHandler(e) {
    if (e.target.value === "") {
      setPasswordErr("Can't be empty");
    } else if (e.target.value.length < 8) {
      setPasswordErr("Password length must be 8 or more");
    } else {
      setPasswordErr("");
      setPassword(e.target.value);
    }
  }
  function confirmpasswordHandler(e) {
    if (e.target.value === "") {
      setConfirmPasswordErr("Can't be empty");
    } else if (e.target.value.length < 8) {
      setConfirmPasswordErr("Password length must be 8 or more");
    } else {
      setConfirmPasswordErr("");
      setConfirmPassword(e.target.value);
    }
  }
  function dobHandler(e) {
    if (e.target.value === "") {
      setDobErr("Can't be empty");
    } else {
      setDobErr("");
      setDob(e.target.value);
    }
  }
  function fileHandler(e) {
    if (e.target.value === "") {
      setFileErr("Can't be empty");
    } else {
      setFileErr("");
      setFile(e.target.value);
    }
  }

  return (
    <div className="mainContainer1">
      <ToastContainer autoClose={2000} />
      <div className=" mainContainer vh-70   d-flex justify-content-center align-items-center ">
        <div className="registerImg">
          <img src="/assets/reg2.jpg" alt="img" />
        </div>
        <div className="formContainer col-md-6  p-5 shadow-lg border rounded-5  bg-white">
          <h2 className="text-center mb-10 text-primary">Welcome!</h2>
          <form name="registerform" onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                onChange={fnameHandler}
              />
              <p className="errorMsg">{fnameErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control "
                onChange={lnameHandler}
              />
              <p className="errorMsg">{lnameErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control "
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={emailHandler}
              />
              <p className="errorMsg">{emailErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control "
                id="exampleInputPassword1"
                onChange={passwordHandler}
              />
              <p className="errorMsg">{passwordErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control "
                id="exampleInputPassword1"
                onChange={confirmpasswordHandler}
              />
              <p className="errorMsg">{confirmpasswordErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control "
                onChange={dobHandler}
              />
              <p className="errorMsg">{dobErr}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Upload File</label>
              <input
                type="file"
                className="form-control "
                onChange={fileHandler}
              />
              <p className="errorMsg">{fileErr}</p>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="mt-3">
            <p className="mb-0  text-center" style={{ color: "black" }}>
              Already have an account? &nbsp; &nbsp;
              <Link to="/login">
                <a href="" className="text-primary fw-bold">
                  Login
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
