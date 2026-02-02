import MobileNavBar from "../MobileNavBar/MobileNavBar";
import Navbar from "../Navbar/Navbar";
import "./AllOrders.css"

const AllOrders = ()=>{
    return(
        <div className="d-flex">
            <div className="d-none d-md-block">
        <Navbar />
      </div>
      <div className="mt-2 ms-3" title="SideBar">
                    <MobileNavBar />
      </div>
        <div className="d-flex justify-content-center align-items-center w-100 min-vh-100">
            <h1>No Orders yet</h1>
        </div>
        </div>
    )
}

export default AllOrders;