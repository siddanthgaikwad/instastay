import express from "express";

import {createBookingController, 
    CreatePaymentIntentController, 
    getBookingsController, 
    searchBookingsController, 
    updateAvailabilityController
} from "../controller/Booking.js"

const app = express.Router();

app.post("/create-payment-intent",CreatePaymentIntentController);
app.patch("/update-availability",updateAvailabilityController);
app.post("/create-booking",createBookingController);
app.get("/get-all-bookings",getBookingsController);
app.get("/search/:keyword",searchBookingsController);

export default app;
