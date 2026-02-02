import {useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';
import {toast} from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({
        user: null,
        token : "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const data = localStorage.getItem("auth");
        // console.log("Data from UserContext : ",data);
        if(data){
            try{
                const parsedData = JSON.parse(data);
                setAuth({
                    user: parsedData?.user || null,
                    token : parsedData?.jwtToken || "",
                })
            }
            catch(error){
                // console.error("Error parsing auth data from local storage: ", error);
                toast.error(error)
            }
        }
        else{
            // console.error("no auth data found in localStorage");
            // toast.error("No data found.");
        }
        setIsLoading(false);
    },[]);

    if(isLoading){
        return  <div>
                loading...
            </div>
        
    }

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook
const useAuth = ()=> useContext(AuthContext);
export {useAuth, AuthProvider};
