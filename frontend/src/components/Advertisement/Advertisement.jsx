import "./Advertisement.css"
import backgroundImage from "../../assets/Rectangle 18.png"
import smartphoneImage from "../../assets/Isolated_right_hand_with_smartphone 2.png"

const Advertisement = ()=>{
    return(
        <div 
            className="custom-hero-banner"
            style={{backgroundImage: `url(${backgroundImage})`}}
        >
            <div className="d-flex align-items-center custom-flex-breakpoint">
                <div className="d-flex flex-column gap-3">
                    <h2 className="fs-5 fs-md-4 fw-semibold text-white mt-4">
                        Download the mobile application for bonus <br /> coupons and travel codes
                    </h2>
                    <button className="text-white fw-semibold rounded px-3 py-2 px-md-4 py-md-3 custom-width-btn">
                        Download mobile app
                    </button>
                </div>
                <img 
                    src={smartphoneImage}
                    alt="Smartphone"
                    className="d-none d-md-block custom-ad-img"
                />
            </div>
        </div>
    )
}

export default Advertisement;