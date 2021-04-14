import React, { useState, useEffect } from "react";
import searchIcon from "../dist/assets/desktop/icon-search.svg";
import locationIcon from "../dist/assets/desktop/icon-location.svg";
// import Button from "./Button";
// import Job from "../../src/components/Job";

const SearchForm = ({ params, onParamChange }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const checkSize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      // console.log("clean up");
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <main className="">
      {screenWidth <= 400 ? (
        <form className="form">
          <label htmlFor="description"></label>
          <input
            type="text"
            placeholder="Filter by title..."
            className="form-control-brand"
            name="description"
            value={params.description}
            onChange={onParamChange}
          />
        </form>
      ) : (
        <form className="form">
          <label htmlFor="Description"></label>
          <img src={searchIcon} alt="search icon" className="search-icon" />
          <input
            type="text"
            placeholder={
              screenWidth <= 1023
                ? "Filter by title..."
                : "Filter by title, companies, expertise..."
            }
            className="form-control-brand"
            name="description"
            value={params.description}
            onChange={onParamChange}
          />
          <label htmlFor="Filter by location..."></label>

          <img
            src={locationIcon}
            alt="location icon"
            className="location-icon"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            className="form-control-location"
            name="location"
            value={params.location}
            onChange={onParamChange}
          />
          <input
            type="checkbox"
            className="full-time-only"
            name="full_time"
            value={`${params.full_time ? "on" : "off"}`}
            onChange={onParamChange}
          />
          <label htmlFor="Full Time Only">
            {screenWidth <= 1023 ? "Full Time" : "Full Time Only"}
          </label>
          <button type="submit" className="search-reset-btn">
            Reset Search
          </button>
          {/* <Button type="submit" content={"Search"} className="search-btn" /> */}
        </form>
      )}
    </main>
  );
};

export default SearchForm;
