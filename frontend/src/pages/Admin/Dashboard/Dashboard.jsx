import Details from "../Details/Details";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css"

const Dashboard = ()=>{
    return(
        <>
        <div className="d-none d-md-block custom-dashboard-container">
            <div className="custom-dashboard-card">
                <div className="">
                    <Navbar />
                </div>
                <Details />
            </div>
        </div>
        <div 
            className="d-md-none d-flex flex-column gap-2"
            style={{marginTop : "60px"}}
        >
            <div className="mt-2 ms-3" title="SideBar">
                    <MobileNavBar />
            </div>
            <div className="mt-1">
                <Details />
            </div>
        </div>
        </>
    )
}

export default Dashboard;