import {Route,Routes} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from "./components/routes/Private/Private"
import AdminRoutes from "./components/routes/Admin/Admin"
import UserDashboard from './pages/User/UserDashboard/userDashboard';
import YourOrder from './pages/User/YourOrder/YourOrder';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import CreatePost from './pages/Admin/CreatePost/CreatePost';
import CreateCategory from './pages/Admin/CreateCategory/CreateCategory';
import Advertisement from './components/Advertisement/Advertisement';
import Footer from './components/Footer/Footer';
import Details from './pages/Admin/Details/Details';
import AllPosts from './pages/Admin/AllPosts/AllPosts';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import CartPage from './pages/Cart/CartPage';
import SearchPage from './pages/SearchPage/SearchPage';
import CategoryDetails from './pages/CategoryDetails/CategoryDetails';
import AllOrders from './pages/Admin/AllOrders/AllOrders';
import Contact from './pages/Contact/Contact';
import About from "./pages/About/About"
import SydneyDetails from './pages/SydneyDetails/SydneyDetails';
import VeganCities from './pages/VeganCities/VeganCities';
import SingleVeganCity from './pages/SingleVeganCity/SingleVeganCity';
import PrePostCovid from './pages/PrePostCovid/PrePostCovid';
import Discover from "./pages/Discover/Discover";
import Payment from './pages/Payment/Payment';
import ThankYou from './pages/ThankYou/ThankYou';
import Activities from './pages/Activities/Activities';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  return(
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:slug" element={<CategoryDetails />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About /> } />
        <Route path="/top-sydney-details" element={<SydneyDetails />} />
        <Route path="/top-vegan-cities" element={<VeganCities/> } />
        <Route path="/top-vegan-cities/:slug" element={<SingleVeganCity />} />
        <Route path="/top-destinations-pre-post-covid" element={<PrePostCovid/>} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/payment" element={<Payment /> } />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="/activities" element={<Activities />} />
 
        {/* User Routing */}
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="/user" element={<UserDashboard/>} />
          <Route path="/user/your-orders" element={<YourOrder />} />
        </Route>

        {/* Admin Routing */}.
        <Route path="/admin" element = {<AdminRoutes />}>
          <Route path="" element={<Dashboard />}  />
          <Route path="/admin/details" element={<Dashboard />} />
          <Route path="/admin/create-post" element = {<CreatePost />} />
          <Route path="/admin/create-category" element={<CreateCategory />} />
          <Route path="/admin/all-post" element={<AllPosts />} />
          <Route path="/admin/all-booking" element={<AllOrders />} />
        </Route>  

        
      </Routes>

      <Advertisement />
      <Footer />
    </>
  )
}

export default App;
