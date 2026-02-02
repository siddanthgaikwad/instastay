import "./NavBar.css";
import React from "react";
import { FaUser, FaHeart } from "react-icons/fa";
import logo from "../../assets/logo (2).png";
import { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { useNavigate,NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { BsCart4 } from "react-icons/bs";
import { MdMenu,MdLocalActivity } from "react-icons/md";
import { IoMdHome,IoIosSearch,IoMdInformationCircle,IoMdContact } from "react-icons/io";
import { FcAbout } from "react-icons/fc";

function NavBar() {
  const isSignIn = false;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  // console.log("this user Auth : ", auth?.user);

  const handleDropDownToggle = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  const handleSideBar = () => {
    setShowSideBar((prevState) => !prevState);
  };

  const closeDropDown = () => { 
    setIsDropDownOpen(false);
  };

  const handleRedirect = () => {
    // console.log("NavBar Auth test : ",auth);
    if (auth?.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Successfully Logged out.");
    navigate("/");
  };

  return (
    <nav className="d-flex flex-row align-items-center justify-content-between p-3 pt-4 bg-white sticky-top" >
      {/* <p className="m-0">Hello</p> */}
      <div
        className="d-flex align-items-center gap-2 custom-navBar-logo"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="ms-1" />
      </div>

      {/* NavBar<NavLinks */}
      <div className="d-none d-md-flex gap-3">
        <NavLink to="/" className={({isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/discover" className={({isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          Discover
        </NavLink>
        <NavLink to="/activities" className={({isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          Activities
        </NavLink>
        <NavLink to="/about" className={({isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          about
        </NavLink>
        <NavLink to="/contact-us" className={({isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          contact
        </NavLink>
        
      </div>

      <div
        className="d-flex align-items-center gap-2 position-relative"
        
      >
        <BsCart4
          size={20}
          className="me-2 user-icon"
          onClick={() => navigate("/cart")}
        />
        <FaUser
          className="user-icon"
          size={20}
          onClick={handleDropDownToggle}
        />
        {isDropDownOpen && (
          <div
            className="position-absolute bg-white rounded shadow-lg drop-down-box"
            onMouseLeave={closeDropDown}
          >
            <ul className="list-unstyled">
              <li className="drop-down-box-item" onClick={handleRedirect}>
                Your Profile
              </li>
              {auth?.user ? (
                <div className="drop-down-box-item" onClick={handleLogout}>
                  Sign Out
                </div>
              ) : (
                <div
                  className="drop-down-box-item"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </div>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* NavBar<NavLinks for xs and sm devices */}
      <div className="d-flex flex-column align-items-center gap-3 d-md-none position-relative me-1">
        <MdMenu size={20} onClick={handleSideBar} />
        {/* <p>Hello</p> */}
        {showSideBar && (
          <div
            className="position-fixed top-0 end-0 vh-60 bg-white shadow-lg p-4"
            style={{ width: "50%", zIndex: 1050 }}
          >
            <MdMenu
              size={20}
              onClick={handleSideBar}
              style={{
                position: "absolute",
                top: 28,
                right: 28,
                cursor: "pointer",
              }}
            />

            <nav className="d-flex flex-column gap-3 mt-5 ">
              <NavLink to="/" className="sideBar-item text-dark" onClick={handleSideBar}>
                <IoMdHome size={22} className="me-2" />
                Home
              </NavLink>
              <NavLink to="/discover" className="sideBar-item text-dark" onClick={handleSideBar}>
                <IoIosSearch size={22} className="me-2" />
                Discover
              </NavLink>
              <NavLink to="/activities" className="sideBar-item text-dark" onClick={handleSideBar}>
              <MdLocalActivity size={22} className="me-2 text-black" />
                Activities
              </NavLink>
              <NavLink to="/about" className="sideBar-item text-dark" onClick={handleSideBar}>
              <IoMdInformationCircle size={22} className="me-2" />
                About
              </NavLink>
              
                <NavLink to="/contact-us" className="sideBar-item text-dark" onClick={handleSideBar}>
              <IoMdContact size={22} className="me-2" />
                Contact
              </NavLink>
              
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
