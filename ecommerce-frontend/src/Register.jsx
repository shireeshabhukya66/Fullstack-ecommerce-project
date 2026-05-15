import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    fetch("http://127.0.0.1:8000/register/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    })
      .then((res) => res.json())

      .then((data) => {
        alert("Registration Successful");

        navigate("/login");
      })

      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Register</h3>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-success" onClick={handleRegister}>
          Register
        </button>

        <p className="mt-3 text-center">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
