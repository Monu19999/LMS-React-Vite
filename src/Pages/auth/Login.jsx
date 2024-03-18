import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      
      className="d-flex flex-column m-5   justify-content-center gap-4 align-items-center"
    >
      <div className="d-flex justify-content-center">
        <img height={64} width={64} src="/public/assets/img/logo.png" alt="" />
      </div>

      <div
        className="card d-flex align-items-center shadow-sm p-4 bg-white  "
        style={{ borderRadius: "10px", width:"400px" }}
      >
        <form className="d-flex  py-3 flex-column gap-3">
          <div className="d-flex flex-column">
            <label htmlFor="email" className="from-label font-weight-bold ">
              Email
            </label>
            <input  type="email" className="form-control" required />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" required />
          </div>
          <div className="gap-2 d-flex">
            <input
              type="checkbox"
              name="remember-me"
              className="form-check-input"
            />
            <span>Remember me </span>
          </div>

          <div className="d-flex gap-3 align-items-center justify-content-end">
            <Link
              to="forget-password"
              style={{ textDecoration: "underline" }}
              className="text-dark"
            >
              Forgot your Password?
            </Link>
            <button
              style={{
                borderRadius: "9px",
                color: "white",
                border: "1px solid ",
                "&:hover": {
                  background: "red"
                },
              }}
              className="px-3 py-2 btn btn-dark text-white "
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
