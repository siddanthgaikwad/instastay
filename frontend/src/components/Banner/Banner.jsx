import "./Banner.css";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import BannerImage from "../../assets/Rectangle 2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSearch } from "../../context/Search";
import { toast } from "react-toastify";

function Banner() {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.keyword) {
      alert("Please enter a keyword to search");
      return;
    }
    try {
      const base = import.meta.env.VITE_BASE_URL;
      if (!base) {
        toast.error("Base URL not configured. Set VITE_BASE_URL in .env");
        return;
      }
      const uri = `${base}/api/post/search/${search.keyword}`;
      console.log("request: ", uri);
      const data = await axios.get(uri);
      console.log("Response ", data);
      setSearch({ ...search, results: data?.data?.posts || data?.data || [] });
      navigate("/search");
    }
    catch (error) {
      toast.error("Cannot search : ", error);
    }
  }
  return (
    <div className="banner" style={{ backgroundImage: `url(${BannerImage})` }}>
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="position-relative z-10 d-flex flex-column align-items-center justify-content-center text-white h-100 px-4 ">
        <h1 className="fw-bold text-center display-5 display-sm-4">
          Enjoy your dream vacation
        </h1>
        <p className="fs-9 fs-sm-5 mt-2 text-center">
          Find the perfect stay with exclusive deals, premium facilities, and locations
          close to everything you love. Book with ease and turn your travel plans into lasting memories.
        </p>

        {/* SearchBar */}
        <div className="fluid-container d-flex justify-content-center search-bar-container">
          <div className="row w-100 justify-content-center">
            <div
              className="mt-5 col-12 col-sm-8 col-md-7 bg-white p-4 rounded shadow 
                    d-flex align-items-center gap-3"
            >
              <input
                type="search"
                className="flex-grow-1 p-2 border border-secondary rounded text-dark bg-white custom-search-input"
                placeholder="Search Destination...."
                value={search?.keyword}
                onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
              />
              <button
                className="px-4 py-2 text-white custom-search-btn"
                onClick={handleSearch}
              >Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
