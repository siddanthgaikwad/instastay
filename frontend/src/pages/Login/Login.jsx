import React, { useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import { FaArrowRight } from "react-icons/fa";
import login from "../../assets/Login.jpg"
import {Link} from "react-router-dom"
import { CSpinner } from "@coreui/react";

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isFocused,setIsFocused] = useState(false);
    const [showPassword,setShowPassword] = useState(false)
    const [error,setError] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setIsLoading(true);
        try{
            
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/api/login`,{
                email,
                password,
            })
            toast.success(`Welcome ${response.data?.user?.name}`);
            setAuth({
              ...auth,
              user : response.data?.user,
              token : response.data?.token,
            })
            localStorage.setItem("auth",JSON.stringify(response.data));
            setIsLoading(false);
            navigate('/')
        }
        catch(error){
          const backendError = error.response?.data?.error || error.response?.data.message || "Something went wrong.Please try again.";
            // console.log(backendError);
            setIsLoading(false);
            setError(backendError);
            toast.error(backendError);
        }
        finally{
            setTimeOut(() => setIsLoading(false), 300);
        }
    }
   
  return (
    <div 
      className="d-flex align-items-center justify-content-center pt-5 pb-5 min-vh-100 min-vw-100 main-container"
      style={{backgroundImage: `url(${login})`}}
    >
        {isLoading &&
             ( <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 loader-overlay">
                <CSpinner />
               </div> 
            )
        }
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-10 col-md-5 bg-white rounded shadow p-4 login-container">
            <h2 className="fs-3 fw-semibold text-center mb-4">Login</h2>

              

            <form onSubmit={handleSubmit} className="form-container">

              <div className="mb-3">
                <label className="text-secondary fs-6 fw-medium">
                  Email address
                </label>
                <input 
                    type="email" 
                    className="user-input shadow" 
                    required
                    value={email}
                    onChange = {(e)=>setEmail(e.target.value)}

                />
              </div>

              <div className="mb-3">
                <label className="text-secondary fs-6 fw-medium">
                  Password
                </label>
                <div className={`d-flex flex-row custom-input-group ${isFocused?"focused":""} shadow justify-content-between`}>
                    <input 
                    type={showPassword?"text":"password"}
                    className="form-control border-0 shadow-none"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onFocus={()=>setIsFocused(true)}
                    onBlur={()=>setIsFocused(false)}
                />
                
                <span className="password-btn" onClick={()=>setShowPassword(!showPassword)}>
                    {showPassword ? "Hide": "Show"}
                </span>
                
                </div>
              </div>

              <div className="mb-4 d-flex justify-content-between">
                <label>
                  <input 
                    type="checkbox"
                    checked={isChecked}
                    onChange = {()=>setIsChecked(!isChecked)}
                />
                  {" "}Remember me for 30 days
                </label>
                <a href="#" className="forget-password">Forgot password?</a>
              </div>
                 {
                    error && <p className="text-danger">*{error}</p>
                 }
              <div className="mb-2">
                <button 
                    className="w-100 btn btn-dark d-flex justify-content-center align-items-center gap-2" type="submit"
                    disabled={isLoading} 
                >
                  Login
                  <span className="text-light"> <FaArrowRight /> </span>
                </button>
              </div>
            </form>

            <p className="text-center mt-5">
                Don't have an account?{" "}
                    {/* <a href="/signUp" className="no-account">
                        SignUp
                    </a> */}
                    <Link to="/signUp" className="no-account">
                        SignUp
                    </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
