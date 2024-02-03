import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let Navigate = useNavigate();
  const [credentials, setcredentails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submitform = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    // API call
    const response = await fetch(`https://ccript-todo-mern-app-task.vercel.app/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      // save the auth token in the localstorage & redirect the home page
      localStorage.getItem("token", json.authtoken);
      props.showAlert("Account Created", "success");
      Navigate("/notes");
    } else {
      props.showAlert("Incorrect deatils", "danger");
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
        <h1 className="my-3 text-center">Create Your account</h1>
        <div className="container d-flex justify-content-center">
          <form
            onSubmit={submitform}
            className="border border-primary rounded px-3"
          >
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Enter Your Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                value={credentials.name}
                onChange={handlechange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter Your Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handlechange}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Enter Your Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                value={credentials.password}
                onChange={handlechange}
                minLength={5}
                required
              />
            </div>
            <button
              type="submit"
              className="btn loginbtn btn-primary px-5 mx-5 my-3"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
