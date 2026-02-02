import "./Navbar.css"
import {FaUser, FaPlus, FaList, FaFolder, FaMap } from "react-icons/fa"
import {Link} from "react-router-dom"

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

const Navbar = ()=>{
    return(
        <div className="custom-admin-navbar-box">
            <nav className="custom-admin-navbar">
                {navbarMenu.map((navbar)=>(
                    <Link 
                        key={navbar.id} 
                        to= {navbar.link} 
                        className="custom-admin-navbar-link"
                    >
                        <span className="custom-admin-navbar-icon">{navbar.icon}</span>
                        <span className="custom-admin-navbar-name">{navbar.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Navbar;