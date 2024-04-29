import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@src/features/app/AuthSlice";

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i;
  console.log("email => ", emailRegex.test(email));
  return emailRegex.test(email);
};

// const isValidPassword = (password) => {
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return passwordRegex.test(password);
// };

const isValidfirst_name = (first_name) => {
  const first_nameRegex = /^[a-zA-Z\s]+$/;
  return first_nameRegex.test(first_name);
};

const isValidlast_name = (last_name) => {
  const last_nameRegex = /^[a-zA-Z\s]+$/;
  return last_nameRegex.test(last_name);
};

export default function Register() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [offices, setOffices] = useState([]);

  const departmentAndOffice = {
    departments: [
      {
        name: "Department of Agriculture",
        offices: ["Bhopal", "Indore", "Jabalpur"],
      },
      {
        name: "Department of Health",
        offices: ["Indore", "Bhopal", "Gwalior"],
      },
      {
        name: "Department of Education",
        offices: ["Jabalpur", "Bhopal", "Gwalior"],
      },
      {
        name: "Department of Transport",
        offices: ["Gwalior", "Indore", "Bhopal"],
      },
      {
        name: "Department of Revenue",
        offices: ["Rewa", "Bhopal", "Indore"],
      },
    ],
  };

  const [selectedOffice, setSelectedOffice] = useState("Select Office---");

  const departmentChangeHandler = (e) => {
    const selectedDepartment = e.target.value;
    console.log("department", selectedDepartment);

    const selectedDepartmentObj = departmentAndOffice.departments.find(
      (department) => department.name === selectedDepartment)
    }
    const navigate = useNavigate();

    const saveEmployee = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employee = {
                first_name,
                last_name,
                email,
                password,
                password_confirmation,
            };

            // console.log(employee);
            let response = await dispatch(register(employee));
            console.log("response => ", response);
            console.log("auth_state => ", auth_state);
            if (auth_state.error_message === "") {
                navigate("/member");
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

        if (!first_name.trim()) {
            errorsCopy.first_name = "First name is required";
            valid = false;
        } else if (!isValidfirst_name(first_name)) {
            errorsCopy.first_name = "First name is invalid";
            valid = false;
        } else {
            errorsCopy.first_name = "";
        }

        if (!last_name.trim()) {
            errorsCopy.last_name = "Last name is required";
            valid = false;
        } else if (!isValidlast_name(last_name)) {
            errorsCopy.last_name = "Last name is invalid";
            valid = false;
        } else {
            errorsCopy.last_name = "";
        }

        if (!password_confirmation.trim()) {
            errorsCopy.password_confirmation = "Confirm Password is Required";
            valid = false;
        } else if (password_confirmation !== password) {
            errorsCopy.password_confirmation = "password not match";
            valid = false;
        } else {
            errorsCopy.password_confirmation = "";
        }
        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className="d-flex flex-column my-3 gap-3 align-items-center">
            <div className="d-flex justify-content-center">
                <Link to="/">
                    <img
                        height={64}
                        width={64}
                        src="assets/img/logo.png"
                        alt="logo"
                    />
                </Link>
            </div>

            <div
                className="card d-flex align-items-center shadow-sm p-3 bg-white"
                style={{ borderRadius: "10px", width: "400px" }}
            >
                {auth_state?.error_message && (
                    <div className="alert alert-danger alert-block mt-3 ml-3 mr-3">
                        <strong>{auth_state.error_message}</strong>
                    </div>
                )}
                <form
                    className="d-flex py-3 w-100 flex-column gap-3"
                    onSubmit={saveEmployee}
                >
                    {/* first name field */}
                    <div className="d-flex flex-column">
                        <label htmlFor="first_name" className="form-label ">
                            First Name
                        </label>
                        <input
                            // required
                            style={{ borderRadius: "5px" }}
                            type="text"
                            className="form-control"
                            value={first_name}
                            onChange={(e) => setfirst_name(e.target.value)}
                        />
                        {errors.first_name && (
                            <div className="text-danger">
                                {errors.first_name}
                            </div>
                        )}
                    </div>

                    {/* last name field */}
                    <div className="d-flex flex-column">
                        <label htmlFor="last_name" className="form-label">
                            Last Name
                        </label>
                        <input
                            // required
                            style={{ borderRadius: "5px" }}
                            type="text"
                            className="form-control"
                            value={last_name}
                            onChange={(e) => setlast_name(e.target.value)}
                        />
                        {errors.last_name && (
                            <div className="text-danger">
                                {errors.last_name}
                            </div>
                        )}
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
                        {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                        )}
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
                            value={password_confirmation}
                            onChange={(e) =>
                                setpassword_confirmation(e.target.value)
                            }
                        />
                        {errors.password_confirmation && (
                            <div className="text-danger">
                                {errors.password_confirmation}
                            </div>
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
                                e.target.style.backgroundColor =
                                    "rgba(0, 0, 0, 0.8)";
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
    setOffices([]);
    setSelectedOffice("Select Office---");
    if (selectedDepartmentObj) {
      setOffices(selectedDepartmentObj.offices);
    }
  };

  const officeChangeHandler = (e) => {
    const selectedOffice = e.target.value;
    console.log("office", selectedOffice);
    setSelectedOffice(selectedOffice);
  };

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const auth_state = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const saveEmployee = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const employee = {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
      };

      // console.log(employee);
      let response = await dispatch(register(employee));
      console.log("response => ", response);
      console.log("auth_state => ", auth_state);
      if (auth_state.error_message === "") {
        navigate("/member");
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

    if (!first_name.trim()) {
      errorsCopy.first_name = "First name is required";
      valid = false;
    } else if (!isValidfirst_name(first_name)) {
      errorsCopy.first_name = "First name is invalid";
      valid = false;
    } else {
      errorsCopy.first_name = "";
    }

    if (!last_name.trim()) {
      errorsCopy.last_name = "Last name is required";
      valid = false;
    } else if (!isValidlast_name(last_name)) {
      errorsCopy.last_name = "Last name is invalid";
      valid = false;
    } else {
      errorsCopy.last_name = "";
    }

    if (!password_confirmation.trim()) {
      errorsCopy.password_confirmation = "Confirm Password is Required";
      valid = false;
    } else if (password_confirmation !== password) {
      errorsCopy.password_confirmation = "password not match";
      valid = false;
    } else {
      errorsCopy.password_confirmation = "";
    }
    setErrors(errorsCopy);
    return valid;
  };

  return (
    <div className="d-flex flex-column my-3 gap-3 align-items-center">
      <div className="d-flex justify-content-center">
        <img height={64} width={64} src="assets/img/logo.png" alt="logo" />
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
            <label htmlFor="first_name" className="form-label ">
              First Name
            </label>
            <input
              // required
              style={{ borderRadius: "5px" }}
              type="text"
              className="form-control"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
            />
            {errors.first_name && (
              <div className="text-danger">{errors.first_name}</div>
            )}
          </div>

          {/* last name field */}
          <div className="d-flex flex-column">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              // required
              style={{ borderRadius: "5px" }}
              type="text"
              className="form-control"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
            />
            {errors.last_name && (
              <div className="text-danger">{errors.last_name}</div>
            )}
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
              value={password_confirmation}
              onChange={(e) => setpassword_confirmation(e.target.value)}
            />
            {errors.password_confirmation && (
              <div className="text-danger">{errors.password_confirmation}</div>
            )}
          </div>

          {/* Departments and Offices */}
          <div>
            <div className="d-flex flex-column">
              <div>
                <label htmlFor="department">Department</label>
              </div>
              <div>
                <select
                  name="department"
                  onChange={departmentChangeHandler}
                  style={{ width: "100%" }}
                  className="form-control"
                >
                  <option>Select Department---</option>
                  {departmentAndOffice.departments.map((department, index) => (
                    <option key={index} value={department.name}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="py-3">
              <div>
                <label htmlFor="office">Office</label>
              </div>
              <div>
                <select
                  value={selectedOffice}
                  onChange={officeChangeHandler}
                  name="office"
                  style={{ width: "100%" }}
                  className="form-control"
                >
                  <option>Select Office---</option>
                  {offices.map((office, index) => (
                    <option key={index} value={office}>
                      {office}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
