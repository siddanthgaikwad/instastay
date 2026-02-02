import MobileNavBar from '../MobileNavBar/MobileNavBar';
import Navbar from '../Navbar/Navbar';
import UserDetails from '../UserDetails/UserDetails';
import './userDashboard.css'

const UserDashboard = ()=>{
    
    return(
        <>
        <div className="d-none d-md-block custom-dashboard-container">
            <div className="custom-dashboard-card">
                <div className="">
                    <Navbar />
                </div>
                <UserDetails />
            </div>
        </div>
        <div className="d-md-none d-flex flex-column gap-2">
            <div className="mt-2 ms-3" title="SideBar">
                    <MobileNavBar />
            </div>
            <div className="mt-1 min-vh-100">
                <UserDetails />
            </div>
        </div>
        
        
        </>
    )
}

export default UserDashboard;
