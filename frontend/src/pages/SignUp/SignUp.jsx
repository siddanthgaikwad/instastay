import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { SiGnuprivacyguard } from "react-icons/si";
import signUp from "../../assets/SignUp.jpg";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(value)) {
      return "Password must be 6+ characters with letters and numbers (no special chars).";
    }
    return "";
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      const validationError = validatePassword(newPassword);
      setError(validationError);
    } else {
      setError("");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validatePassword(password);
    if (validationError !== "") {
      setError(validationError);
      toast.error(validationError);
      return;
    }
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/api/register`, {
        name,
        email,
        password,
      });
      toast.success("Successfully Signed Up. Please Login.");
      navigate('/login');
    }
    catch (error) {
      const backendError = error?.response?.data?.error || error?.response?.data?.message || error?.message || "Something went wrong. Please try again";
      toast.error(backendError);
    }
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center pt-5 pb-5 min-vh-100 min-vw-100 main-container"
      style={{ backgroundImage: `url(${signUp})` }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-10 col-md-5 bg-white rounded shadow p-4">
            <h2 className="fs-3 fw-semibold text-center mb-4">Sign Up</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="text-secondary fs-6 fw-medium">Name</label>
                <input
                  type="text"
                  className="user-input shadow"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="text-secondary fs-6 fw-medium">
                  Email address
                </label>
                <input
                  type="email"
                  className="user-input shadow"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="text-secondary fs-6 fw-medium">
                  Password
                </label>
                <div
                  className={`d-flex flex-row custom-input-group ${isFocused ? "focused" : ""
                    } shadow justify-content-between`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-0 shadow-none"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />

                  <span
                    className="password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>

              </div>
              {error && <p className="text-danger">*{error}</p>}
              <div className="mb-2">
                <button className="w-100 btn btn-dark d-flex justify-content-center align-items-center gap-2" type="submit">
                  Sign Up
                  <span className="text-light"> <SiGnuprivacyguard /> </span>
                </button>
              </div>
            </form>

            <p className="text-center mt-5">
              Have an account?{" "}
              <Link to="/login" className="no-account">
                Please Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
