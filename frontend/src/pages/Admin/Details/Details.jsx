import "../../User/UserDetails/userDetails.css"

import {useAuth} from "../../../context/UserContext"
import { FaUserCheck } from "react-icons/fa";
import {MdMarkEmailRead} from 'react-icons/md'


const Details = ()=>{
    const [auth,setAuth] = useAuth();
    console.log("Auth from Details : ",auth);
    const user = {
        name: auth?.user?.name,
        email : auth?.user?.email,
    }
    console.log("Auth from User Details : ",auth);

    return(
        <div className="custom-userDetails-card">
            <h2 className="fs-4 fw-bold text-dark mb-4 text-center">
                User Details
            </h2>
            <div>
                <div className="d-flex align-items-center mb-4">
                    <span className="custom-userDetails-label">
                        <span className="text-primary">
                            <FaUserCheck />
                        </span>
                        Name:
                    </span>
                    <span className="text-secondary fw-semibold">
                        {user.name}
                    </span>
                </div>
                <div className="d-flex align-items-center mb-4">
                    <span className="custom-userDetails-label">
                        <span className="text-primary">
                            <MdMarkEmailRead />
                        </span>
                        Email:
                    </span>
                    <span className="text-secondary fw-semibold">
                        {user.email}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Details;