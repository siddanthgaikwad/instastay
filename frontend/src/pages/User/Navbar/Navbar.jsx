import './Navbar.css'
import {FaUser, FaPlus, FaList} from "react-icons/fa";
import {Link} from "react-router-dom";

const navbarMenu = [
    {id : 1, name: "User Details", link: '/user', icon : <FaUser />},
    {id : 2, name: "Your Order", link: '/user/your-orders', icon : <FaPlus />},
 ]


const Navbar = ()=>{
    return(
        <div className="custom-user-Navbar">
            <nav className="d-flex flex-column align-items-center p-4">
                {navbarMenu.map((item)=>(
                    <Link
                        key = {item.id}
                        to = {item.link}
                        className= "custom-flex-item"
                    >
                        <span className="me-3 fs-5">{item.icon}</span>
                        <span className="fs-6">{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Navbar;