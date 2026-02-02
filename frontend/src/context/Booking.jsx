import { createContext,useState, useEffect, useContext } from "react";

const BookingContext = createContext();

const BookingProvider = ({children}) =>{
    const [book, setBook] = useState([]);

    useEffect(()=>{
        let existingBookingItem = localStorage.getItem("booking");
        if(existingBookingItem){
            setBook(JSON.parse(existingBookingItem));
        }
    },[]);

    return(
        <BookingContext.Provider value = {[book,setBook]}>
            {children}
        </BookingContext.Provider>
    );
};

// Custom hook
const useBook = () => useContext(BookingContext);

export {useBook, BookingProvider};