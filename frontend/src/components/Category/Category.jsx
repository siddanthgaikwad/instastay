import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import "./Category.css";
import { CSpinner } from "@coreui/react";
import {toast} from "react-toastify";

const Category = ()=>{
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const title = params.slug.charAt(0).toUpperCase()+params.slug.slice(1);
    // console.log("Categories : ",categories);
    const fetchCategory = async ()=>{
        
        try{
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/single-category/${params.slug}`);
            // console.log("Single Category details : ",response.data);
            setCategories(response.data.post);
        }
        catch(error){
            // console.log("Error while fetching Category : ",error);
            toast.error("Error while fetching the Category. Please try again.")
        }
    }

    useEffect(()=>{
        fetchCategory();
    },[]);

    if(categories.length<1){
        return(
            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <CSpinner />
            </div>
        )
    }
    return(
        <div className="container">
            {/* <div className="row"> */}
            <h1 className="ms-5 mb-5 text-center font-Raleway text-dark fw-semibold">{title}</h1>
        
        <div className="row">
            
            {categories.map((category) => (
                <div 
                    className="col-12 col-md-3 category-image-container"
                    key={category._id}
                    onClick={()=> navigate(`/product/${category?.slug}`)}
                >
                    <img 
                        src={category?.images[0]}
                        alt={category?.title}
                        className="category-image"
                    />
                    <p className="category-text-name">{category?.title}</p>
                </div>
            ))}
        </div>
        </div>
        // </div>
    )
}

export default Category;