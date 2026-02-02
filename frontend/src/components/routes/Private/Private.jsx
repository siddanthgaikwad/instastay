import "./Private.css"

import {useEffect,useState} from "react"
import {useAuth} from "../../../context/UserContext"
import {Outlet} from "react-router-dom"
import axios from "axios"
import { CSpinner } from '@coreui/react'

export default function PrivateRoute(){
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    // console.log("Auth from Private route : ",auth);
    useEffect(()=>{
        if(!auth?.token){
            // console.log("No JWT token found");
            setOk(false);
            return;
        }
        const authCheck = async ()=>{
                // console.log("Token being passed : ",auth?.token);
                // console.log("Auth object: ",auth);
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/api/user-auth`,{
                    headers: {
                        Authorization: `Bearer ${auth?.token}`,
                    },
                });

                // setOk(res.data.ok);
                // console.log("API response: ",res.data);
                // console.log(res.data.ok);
                if(res.data?.ok){
                    setOk(true);
                }
                else{
                    // console.log("Authorization check failed: response not ok");
                    setOk(false);
                }
            
        };
        
        authCheck();

    },[auth?.token]);

    return ok ? <Outlet /> : (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            <CSpinner />
        </div>
    );
}