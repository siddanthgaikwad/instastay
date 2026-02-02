import logo from "../../assets/logo (2).png"
import "./Footer.css"
import {Link} from "react-router-dom";

const Footer = ()=>{
    return(
        <footer className="bg-light py-5">
            <h2 className="h2 fw-semibold text-dark mt-4 text-center">
                Explore the world with My Dream place
            </h2>

            <div className="container mt-4 d-flex flex-column flex-md-row">
                {/* Left Section */}
                <div className="mb-4 me-md-5">
                    <img src={logo} alt="logo" className="img-fluid" style={{height: "32px", width: "auto"}} />
                    {/* <h1 className="h4 fw-semibold text-dark mt-2"></h1> */}
                    <p className="text-muted mt-2">
                        Your next go-to companion for travel
                    </p>
                </div>

                {/* Links Section */}
                <div className="row g-4 flex-grow-1">
                    {/* Website Links */}
                    <div className="col-6 col-md-3">
                        <h3 className="h6 fw-semibold text-dark mb-3">Company</h3>
                        <ul className="list-unstyled">
                            <li><Link to="/about" className="text-muted text-decoration-none hover-link">About</Link> </li>                                        
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Jobs</Link> </li> 
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Newsroom</Link> </li>   
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Advertising</Link> </li>                                        
                            <li><Link to="/contact-us" className="text-muted text-decoration-none hover-link">Contact</Link> </li>                                        
                        </ul>
                    </div>

                    {/* Explore Links  */}
                    <div className="col-6 col-md-3">
                        <h3 className="h6 fw-semibold text-dark mb-3">Explore</h3>
                        <ul className="list-unstyled">
                            <li><Link to="/category/:india" className="text-muted text-decoration-none hover-link">India</Link></li>
                            <li><Link to="/category/new-zealand" className="text-muted text-decoration-none hover-link">New Zealand</Link></li>
                            <li><Link to="/category/australia" className="text-muted text-decoration-none hover-link">Australia</Link></li>
                            <li><Link to="/category/europe" className="text-muted text-decoration-none hover-link">Europe</Link></li>
                            <li><Link to="/category/usa" className="text-muted text-decoration-none hover-link">United State America (USA)</Link></li>
                            <li><Link to="/category/france" className="text-muted text-decoration-none hover-link">Italy</Link></li>
                            <li><Link to="/" className="text-muted text-decoration-none hover-link">See more</Link></li>
                        </ul>
                    </div>

                    {/* Terms and Policies */}
                    <div className="col-6 col-md-3">
                        <h3 className="h6 fw-semibold text-dark mb-3">Terms and Policies</h3>
                        <ul className="list-unstyled">
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Terms of User</Link></li>
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Accessibility</Link></li>
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Reward system policy</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div className="col6 col-md-3">
                        <h3 className="h6 fw-semibold text-dark mb-3">Help</h3>
                        <ul className="list-unstyled">
                            <li><Link to="/about" className="text-muted text-decoration-none hover-link">Support</Link></li>
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Cancel your bookings</Link></li>
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Use Coupon</Link></li>
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">Refund Policies</Link></li>
                            <li><Link to="#" className="text-muted text-decoration-none hover-link">International Travel Documents</Link></li>
                        </ul>
                    </div>
                </div>


            </div>
        </footer>
    )
}

export default Footer;
