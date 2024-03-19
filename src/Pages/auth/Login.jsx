import React, { useState } from "react";
import { Link } from "react-router-dom";

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateEmail = (newEmail) => {
    setEmail(newEmail);
    setEmailError(newEmail && !isValidEmail(newEmail) ? "Please enter a valid email address" : "");
  };

  const validatePassword = (newPassword) => {
    setPassword(newPassword);
    setPasswordError(newPassword && !isValidPassword(newPassword) ? "Password must be 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character" : "");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if(emailError===null || passwordError===null){
        alert("Enter email and Password");
        return;
    }
    if(emailError && emailError!==""){
        alert("email is not valid");
        return;
    }else if(passwordError && passwordError!==""){
        alert("password is not valid");
        return;
    }
    console.log("email: ", email);
    console.log("password : ", password);
    console.log("form submitted successfully");
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
          onSubmit={handleLogin}
        >
          <div className="d-flex flex-column">
            <label htmlFor="email" className="from-label font-weight-bold">
              Email
            </label>
            <input
              style={{ borderRadius: "5px" }}
              type="email"
              className="form-control"
              
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
            />
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              style={{ borderRadius: "5px" }}
              type="password"
              className="form-control"
              
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
            />
            {passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
          </div>
          <div className="gap-2 d-flex">
            <input
              type="checkbox"
              name="remember-me"
              className="form-check-input"
            />
            <span>Remember me</span>
          </div>

          <div className="d-flex gap-3 align-items-center justify-content-end">
            <Link
              to="forget-password"
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
                Forgot your Password?
              </span>
            </Link>
            <button
            // disabled={ !(emailError==="" && passwordError==="")}
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
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
