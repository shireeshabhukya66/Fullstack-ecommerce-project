import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        localStorage.setItem("token", data.access);

        alert("Login Successful");

        navigate("/");
      })

      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: "400px" }}>
        <h3 className="mb-4 text-center">Login</h3>

        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        
        <p className="mt-3 text-center">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
