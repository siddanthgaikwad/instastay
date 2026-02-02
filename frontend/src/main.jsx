import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/UserContext.jsx';
import { CartProvider } from './context/Cart.jsx';
import { SearchProvider } from './context/Search.jsx';
import { BookingProvider } from './context/Booking.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe} from '@stripe/stripe-js';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(`${import.meta.env.VITE_BASE_STRIPE_KEY}`)
createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <CartProvider>
  <BookingProvider>
    <Elements stripe={stripePromise}>
  <SearchProvider>
    
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer />
    
  </SearchProvider>
  </Elements>
  </BookingProvider>
  </CartProvider>
  </AuthProvider>
)
