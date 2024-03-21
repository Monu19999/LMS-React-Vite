import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { login } from "@src/features/app/AuthSlice";

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i;
  console.log("email => ", emailRegex.test(email));
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};


const isValidFirstName = (firstName) => {
    const firstNameRegex = /^[a-zA-Z\s]+$/;
    return firstNameRegex.test(firstName);
};



const isValidLastName = (lastName) => {
    const lastNameRegex = /^[a-zA-Z\s]+$/;
    return lastNameRegex.test(lastName);
};


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [name, setName] = useState({
    first_name: "",
    last_name: "",
  });

  const auth_state = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const saveEmployee = async (e) => {
    e.preventDefault();
    // console.log(validateForm());
    if (validateForm()) {
      const employee = { email, password };
      console.log(employee);
      let response = await dispatch(login(employee));
      // console.log("response => ", response);
      console.log("auth_state => ", auth_state);
      if (auth_state.error_message == "") {
        navigate("/front");
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!email.trim()) {
      errorsCopy.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(email)) {
      errorsCopy.email = "Email is invalid";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!password.trim()) {
      errorsCopy.password = "Password is required";
      valid = false;
    } else {
      errorsCopy.password = "";
    }

    if (!name.first_name.trim()) {
        errorsCopy.firstName = "First name is required";
        valid = false;
    } else if (!isValidFirstName(name.first_name)) {
        errorsCopy.firstName = "First name is invalid";
        valid = false;
    } else {
        errorsCopy.firstName = "";
    }

    if (!name.last_name.trim()) {
        errorsCopy.lastName = "Last name is required";
        valid = false;
    } else if (!isValidLastName(name.last_name)) {
        errorsCopy.lastName = "Last name is invalid";
        valid = false;
    } else {
        errorsCopy.lastName = "";
    }


    if(!confirmPassword.trim()){
        errorsCopy.confirmPassword = "Confirm Password is Required";
        valid = false;
    }else if(confirmPassword!== password){
        errorsCopy.confirmPassword = "password not match";
        valid = false;
    }else {
        errorsCopy.confirmPassword = "";
    }
    setErrors(errorsCopy);
    return valid;
};


  return (
    <div className="d-flex flex-column my-3 gap-3 align-items-center">
      <div className="d-flex justify-content-center">
        <img height={64} width={64} src="/public/assets/img/logo.png" alt="" />
      </div>

      <div
        className="card d-flex align-items-center shadow-sm p-3 bg-white"
        style={{ borderRadius: "10px", width: "400px" }}
      >
        <form
          className="d-flex py-3 w-100 flex-column gap-3"
          onSubmit={saveEmployee}
        >
          {/* first name field */}
          <div className="d-flex flex-column">
            <label htmlFor="fname" className="form-label ">
              First Name
            </label>
            <input
            // required
              style={{ borderRadius: "5px" }}
              type="text"
              className="form-control"
              value={name.first_name}
              onChange={(e) => setName({ ...name, first_name: e.target.value })}
            />
            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
          
          </div>

          {/* last name field */}
          <div className="d-flex flex-column">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
            // required
              style={{ borderRadius: "5px" }}
              type="text"
              className="form-control"
              value={name.last_name}
              onChange={(e) => setName({ ...name, last_name: e.target.value })}
            />
          {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
          </div>

          {/* email field */}
          <div className="d-flex flex-column">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              style={{ borderRadius: "5px" }}
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          {/*  password field */}
          <div className="d-flex flex-column">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              style={{ borderRadius: "5px" }}
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          {/* confirm password field */}
          <div className="d-flex flex-column">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              style={{ borderRadius: "5px" }}
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
             {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="d-flex gap-3 align-items-center justify-content-end">
            <Link
              to="/auth/login"
              style={{ textDecoration: "underline" }}
              className="text-dark"
            >
              <span
                onMouseEnter={(e) => {
                  e.target.style.color = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "black";
                }}
              >
                Already registered?
              </span>
            </Link>
            <button
              style={{
                borderRadius: "8px",
                padding: "8px 12px",
                backgroundColor: "black",
                color: "white",
                transition: "background-color 0.3s, color 0.3s",
              }}
              className="btn btn-dark text-white"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "white";
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
