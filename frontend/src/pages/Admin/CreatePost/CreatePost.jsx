import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar"
import "./CreatePost.css"
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
import { CSpinner } from "@coreui/react"

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [hotelLocation, setHotelLocation] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [nearArea, setNearArea] = useState("");
    const [facilities, setFacilities] = useState("");
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [guest, setGuest] = useState("1");
    const [isAvailable, setIsAvailable] = useState(false)
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    console.log("All Categories : ", category);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/get-category`);
            console.log("CreatePost fetch response : ", response.data);
            setCategory(response.data.categories);
        }
        catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [])

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            toast.warn("You can only upload a maximum of 3 images.");
        }
        else {
            setImages(files);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Validate form fields
        if (
            !title ||
            !hotelLocation ||
            !description ||
            !facilities ||
            !nearArea ||
            !selectedCategory ||
            !guest ||
            !price
        ) {
            return toast.error("All fields are required.");
        }

        if (images.length != 3) {
            return toast.error("Please upload exactly 3 images.");
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("hotelLocation", hotelLocation);
        formData.append("description", description);
        formData.append("nearArea", nearArea);
        formData.append("category", selectedCategory);
        formData.append("guest", guest);
        formData.append("isAvailable", isAvailable);
        formData.append("price", price);
        formData.append("facilities", facilities);

        images.forEach((file) => {
            formData.append("images", file);
        });

        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/post/create-post`,
                formData,
                // {
                //     headers : {
                //         "Content-Type" : "multipart/form-data",
                //     },
                // }
            );
            setIsLoading(false);
            toast.success("Post created successfully!");

            // Reset form
            setTitle("");
            setHotelLocation("");
            setDescription("");
            setFacilities("");
            setNearArea("");
            setSelectedCategory("");
            setImages([]);
            setGuest("1");
            setIsAvailable(false);
            setPrice("");
        }
        catch (error) {
            console.error("Error creating post: ", error);
            toast.error("Failed to create post.");
        }
    };



    return (
        <div className="d-flex flex-column flex-md-row justify-content-between text-black">
            <div className="d-none d-md-block createpost-navbar">
                <Navbar />
            </div>
            <div className="ms-3" title="SideBar">
                <MobileNavBar />
            </div>

            <div className="create-post-form-container">
                <h1 className="create-post-heading">Create Post</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="create-post-form">

                    {/* Title input */}
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="create-post-input-field"
                        required
                    />

                    {/* Hotel Location */}
                    <input
                        type="text"
                        placeholder="Hotel Location"
                        value={hotelLocation}
                        onChange={(e) => setHotelLocation(e.target.value)}
                        className="create-post-input-field"
                        required
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="create-post-input-field"
                        required
                    />

                    {/* Facilities */}
                    <input
                        type="text"
                        placeholder="Facilities"
                        value={facilities}
                        onChange={(e) => setFacilities(e.target.value)}
                        className="create-post-input-field"
                    />

                    {/* Price  */}
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="create-post-input-field"
                        required
                    />

                    {/* Nearby Area */}
                    <input
                        type="text"
                        placeholder="Nearby Area"
                        value={nearArea}
                        onChange={(e) => setNearArea(e.target.value)}
                        className="create-post-input-field"
                        required
                    />

                    {/* Categories */}
                    <div className="mb-3">
                        <label
                            htmlFor="category"
                            className="create-post-input-label"
                        >
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="create-post-input-field create-post-input-category"
                        >
                            <option value="">Select a category</option>
                            {
                                category?.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Guests */}
                    <div className="mb-3">
                        <label
                            htmlFor="guest"
                            className="create-post-input-label"
                        >
                            Guests
                        </label>
                        <select
                            id="guest"
                            value={guest}
                            onChange={(e) => setGuest(e.target.value)}
                            className="create-post-input-field create-post-input-category"
                        >
                            {[...Array(6)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* isAvailable */}
                    <div className="mb-3">
                        <label
                            htmlFor="isAvailable"
                            className="create-post-input-label"
                        >
                            Availability
                        </label>
                        <select
                            id="isAvailable"
                            value={isAvailable}
                            onChange={(e) =>
                                setIsAvailable(e.target.value === "true" ? true : false)
                            }
                            className="create-post-input-field create-post-input-category"
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    {/* Upload Images */}
                    <div className="create-post-uploadImages-div">
                        <label className="d-flex align-items-center cursor-pointer">
                            <FaImage className="create-post-uploadImage-faImage" />
                            <span>Uplaod Images (max 3)</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="d-none"
                            />
                        </label>
                        <div className="d-flex gap-3 mt-2">
                            {images.map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${index + 1}`}
                                    className="create-post-image-style"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="create-post-submit-btn"
                    >
                        Create Post
                    </button>
                </form>
                {isLoading ?
                    (
                        <div
                            className="d-flex align-items-center justify-content-center min-vh-100 spinner-class"
                        >
                            <CSpinner size="sm" />
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default CreatePost;