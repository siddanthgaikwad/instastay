import { Link } from "react-router-dom";
import aboutImage from "../../assets/about-bg.jpg"
import aboutBackgroundImage from "../../assets/aboutImage.jpg"
import "./About.css"
import {MdVerifiedUser, MdSupportAgent} from "react-icons/md"
import {IoMdPricetag} from "react-icons/io"
import {SiFastify} from "react-icons/si"

function About(){
    return(
        <div className="about-page">
            
            <section
                className="hero"
                style={{backgroundImage: `url(${aboutBackgroundImage})`}}
            >
                <div className="hero-overlay">
                    <h1>About Us</h1>
                    <p>Making hotel booking simple, transparent, and stress-free.</p>
                    <Link to="/" className="cta-btn">Browse Hotels</Link>
                </div>
            </section>

            <section className="story container">
                <div className="story-text">
                    <h1>Our Story</h1>
                    <p>
                        The idea behind this <strong>InstaStay</strong> was born out of
                        a simple frustration: why is finding and booking a hotel so complicated? 
                        Endless tabs, confusing pricing, hidden charges — we knew there had 
                        to be a better way.
                    </p>
                    <p>
                        That's why we built this <strong>InstaStay</strong>  — a platform designed to make 
                        travel planning easy, transparent, and stress-free.
                    </p>
                </div>
                <div className="story-img">
                    <img src={aboutImage} alt="travellers view" />
                </div>
            </section>

            <section className="offers container">
                <h2>What we offer</h2>
                <div className="offer-cards">
                    <div className="card">
                        <MdVerifiedUser size={20} />
                        Verified Hotels
                    </div>
                    <div className="card">
                        <IoMdPricetag size={20} />
                        Best Price Guarantee
                    </div>
                    <div className="card">
                        <SiFastify size={20} />
                        Instant Booking
                    </div>
                    <div className="card">
                        <MdSupportAgent size={20} />
                        24/7 customer support
                    </div>
                </div>
            </section>

            <section className="why-us">
                <h2>Why Choose Us ?</h2>
                <div className="stats">
                    <div className="stat">
                        <h3>50,000+</h3>
                        <p>Happy Travelers</p>
                    </div>
                    <div className="stat">
                        <h3>500+</h3>
                        <p>Partner Hotels</p>
                    </div>
                    <div className="stat">
                        <h3>
                            4.8/5
                        </h3>
                        <p>Customer Rating</p>
                    </div>
                </div>
            </section>

            <section className="values container">
                <h2>Our Mission & Values</h2>
                <div className="value-tags">
                    <span>Transparency</span>
                    <span>Trust</span>
                    <span>Simplicity</span>
                    <span>Care</span>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to plan your next stay?</h2>
                <Link to="/" className="cta-btn" >Explore Hotels</Link>
            </section>
        </div>
    )
}

export default About;