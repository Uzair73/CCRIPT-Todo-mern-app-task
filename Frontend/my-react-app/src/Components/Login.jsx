import { React, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = (props) => {
  let Navigate = useNavigate();
  const [credentials, setcredentails] = useState({ email: "", password: "" });
  const submitform = async (e) => {
    e.preventDefault();
    // API call
    const response = await fetch(`https://ccript-todo-mern-app-task.vercel.app/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save the auth token in the localstorage & redirect the home page
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Login Successfully", "success");
      Navigate("/notes");
    } else {
      props.showAlert("Invalid Credentials! Please try again.", "danger");
    }
  };
  // onchange functio
  const handlechange = (e) => {
    e.preventDefault();
    setcredentails({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        {/* <div className="triangle"></div> */}
        {/* <span className="span">
          Welcome to the YNotebook - Your Notes save on the Cloud.
        </span>*/}
        <h1 className="my-3 mx-3 text-center">Login to your account</h1>
        <div className="container d-flex justify-content-center">
          <form
            onSubmit={submitform}
            className="border border-primary rounded px-3 login-from"
          >
            <div className="mb-3">
              <i className="fa fa-user-circle mx-2" aria-hidden="true"></i>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="exampleInputEmail1"
                value={credentials.email}
                onChange={handlechange}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <i className="fa fa-unlock-alt mx-2" aria-hidden="true"></i>
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                value={credentials.password}
                onChange={handlechange}
              />
            </div>
            <div className="container">
              <button
                type="submit"
                className="btn loginbtn btn-primary px-5 mx-5 my-3"
              >
                Login
              </button>
              <div className="signup">
                Don't have an account?
                <NavLink className="btn btn-primary my-2 mx-2" to="/signup">
                  Sign up
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
