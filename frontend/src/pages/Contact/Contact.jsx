import { useState } from "react";
import "./Contact.css"
import axios from "axios";
import { toast } from "react-toastify";
import { CSpinner } from "@coreui/react";
import { useAuth } from "../../context/UserContext"
import { FaBug } from "react-icons/fa"

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bug, setBug] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    // console.log("Auth from contact page : ",auth)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/bugs/report-bug`, {
                name,
                email,
                bug
            },
                {
                    headers: {
                        Authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            toast.success("Thanks for finding the bug.");

            setName("");
            setEmail("");
            setBug("");
        }
        catch (error) {
            // console.log("Error in contact page: ",error);
            toast.error("Failed to report bug. Please try again.", error);

        }
        setIsLoading(false);
    }

    return (
        <>
            <div className="min-vh-100 fluid-container">
                <div className="row justify-content-center">
                    <h1 className="mt-5 mb-4 font-Raleway text-center">Report a Bug</h1>
                    <div className="col-10 col-md-4 text-center bug-form-container">
                        <form onSubmit={handleSubmit} className="mt-3 mb-3 bug-form">

                            {/* Name input */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className="input-field"
                                    placeholder="Name"
                                />
                            </div>

                            {/* Email input */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="input-field"
                                    placeholder="Email"
                                />
                            </div>

                            {/* Report a bug */}
                            <div className="mb-4">
                                {/* <label for="textarea" className="bug-text">Report a bug</label> */}
                                <textarea
                                    rows={5}
                                    placeholder="Enter the bug..."
                                    id="textarea"
                                    className="input-field"
                                    onChange={(e) => setBug(e.target.value)}
                                    value={bug}
                                />
                            </div>

                            <div className="mb-3 mt-3">

                                <button type="submit" className="bug-btn">
                                    Report
                                    <FaBug className="ms-2" />
                                </button>

                            </div>
                        </form>
                        {
                            isLoading && (
                                <div className="min-vh-100 position-absolute d-flex align-items-center">

                                    <CSpinner size="sm" />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact;