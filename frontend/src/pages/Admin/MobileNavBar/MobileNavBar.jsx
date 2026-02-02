import "./MobileNavBar.css"
import {Link, NavLink} from "react-router-dom"
import {FaUser, FaPlus, FaList, FaFolder, FaMap} from "react-icons/fa"
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

const navbarMenu = [
  { id: 1, name: "Admin Details", link: "/admin/details", icon: <FaUser /> },
  { id: 2, name: "Create Post", link: "/admin/create-post", icon: <FaPlus /> },
  { id: 3, name: "All Posts", link: "/admin/all-post", icon: <FaList /> },
  {
    id: 4,
    name: "Create Category",
    link: "/admin/create-category",
    icon: <FaFolder />,
  },
  { id: 5, name: "All Orders", link: "/admin/all-booking", icon: <FaMap /> },
];

const MobileNavBar = ()=>{
    const [showSideBar, setShowSideBar] = useState(false);

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
                    className={({isActive}) => 
                        isActive ? "custom-link-active" : "custom-link"
                    }
                    onClick={handleClick}
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