import { useState } from "react"
import {MdMenu, MdClose} from "react-icons/md"
import {FaUser, FaPlus} from "react-icons/fa"
import {NavLink, useNavigate} from "react-router-dom"

import "./MobileNavBar.css"

const navbarMenu = [
    {id : 1, name: "User Details", link: '/user', icon : <FaUser />},
    {id : 2, name: "Your Order", link: '/user/your-orders', icon : <FaPlus />},
]

const MobileNavBar = ()=>{
    const [showSideBar, setShowSideBar] = useState(false);
    const navigate = useNavigate();

    const handleSideBar = ()=>{
        setShowSideBar((prevState)=> !prevState);
    }

    const handleClick = ()=>{
        setShowSideBar((prevState) => !prevState);
    }

    return(
        <div className="d-flex flex-column gap-3 d-md-none position-relative">
            <MdMenu 
                size={20} 
                onClick={handleSideBar}
                className = {showSideBar? "text-light" : "text-dark"}
            />
            {showSideBar && 
                <div className="position-fixed top-0 start-0 vh-60 bg-white shadow-lg p-4"
                            style={{ width: "60%", zIndex: 1050 }}
                          >
                            <MdClose
                              size={20}
                              onClick={handleSideBar}
                              style={{
                                position: "absolute",
                                top: 28,
                                right: 28,
                                cursor: "pointer",
                                
                              }}
                            />
                            <nav className="d-flex flex-column gap-3 mt-4">
                        {navbarMenu.map((navBar)=>(
                <NavLink 
                    key={navBar.id}
                    to={navBar.link}
                    end={navBar.link==="/user"}
                    className={({isActive}) => 
                        isActive ? "custom-link-active" : "custom-link"
                    }
                    onClick={() => navigate(`/user/${navBar.link}`)}
                >   
                    <span className="me-2">{navBar.icon}</span>
                    <span>{navBar.name}</span>
                </NavLink>
            ))}
            </nav>
                </div>
            }
        </div>
    )
}

export default MobileNavBar;