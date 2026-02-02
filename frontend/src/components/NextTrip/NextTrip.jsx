import {useNavigate} from "react-router-dom";
import "./NextTrip.css";

import Image1 from "../../assets/Post/Rectangle 16.png";
import Image2 from "../../assets/Post/Rectangle 17.png";
import Image3 from "../../assets/Post/Rectangle 8 (1).png";

const NextTrip = () => {
  const navigate = useNavigate();
  const trips = [
    {
      image: Image1,
      title: "Sydney’s 10 most fashionable 5 star hotels",
      description:
        "Browse the fastest growing tourism sector in the heart of Australia's tourism capital ....",
    },
    {
      image: Image2,
      title: "Top cities for Vegan Travellers",
      description:
        "Top sites where you do not have to worry about being a vegan. Our tourist guide is here...",
    },
    {
      image: Image3,
      title: "World’s top destinations during and post covid timeline",
      description:
        "Pandemic is still intact and will be here for a longer time. Here’s where your next destination...",
    },
  ];

  const handleOnClick = (index)=>{
    if(trips[index].title.includes("Sydney")){
      navigate("/top-sydney-details")
    }
    else if(trips[index].title.includes("Vegan")){
      navigate("/top-vegan-cities")
    }
    else{
      navigate("/top-destinations-pre-post-covid")
    }
  }

  return (
  <div className="container mt-5 px-3">
    <h1 className="fs-3 fw-semibold mb-4 ms-2">
        Get inspiration for your next trip
    </h1>
    <div className="d-flex flex-wrap justify-content-center gap-3 mt-5">
        {
            trips.map((trip,index)=>(
                <div 
                key={index}
                className="custom-trip-card"
                onClick = {() => handleOnClick(index)}
                >
                    <img 
                        src={trip.image}
                        alt={trip.title}
                        className="w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-end bg-dark bg-opacity-50">
                        <h2 className="text-white fs-5 fw-semibold">{trip.title}</h2>
                        <p className="text-secondary small">{trip.description}</p>
                    </div>
                </div>
            ))
        }
    </div>
</div>
);


};

export default NextTrip;
