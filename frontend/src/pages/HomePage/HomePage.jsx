import Banner from "../../components/Banner/Banner";
import DreamVacation from "../../components/DreamVacation/DreamVacation";
import Hotel from "../../components/Hotel/Hotel";
import NextTrip from "../../components/NextTrip/NextTrip";
import "./HomePage.css"

function HomePage(){
    return(
        <>
            <Banner />
            <DreamVacation/>
            <NextTrip />
            <Hotel />
        </>
    )
}

export default HomePage;