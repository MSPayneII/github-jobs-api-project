import React, { useState } from "react";
// import Button from "./Button";
import { FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import placeholderLogo from "../dist/assets/favicon-32x32.png";

const Job = ({
  company,
  company_logo,
  company_url,
  created_at,
  description,
  how_to_apply,
  id,
  location,
  title,
  type,
  url,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // console.log("pressed");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const shortenTitle = (obj) => {
    const newTitle = [];
    const titleValue = Object.values(obj).join();

    for (let i = 0; i < titleValue.length; i++) {
      if (titleValue[i] === ",") {
        break;
      }
      newTitle.push(titleValue[i]);
    }

    // console.log(newTitle.join(""));
    return newTitle.join("");
  };

  const timeSincePosting = (current, previous) => {
    const newPrevious = Object.values(previous).join();
    // console.log(newCurrent);
    const updatedNewPrevious = Date.parse(newPrevious);
    // console.log(current);
    // console.log(updatedNewPrevious);

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const timeElapsed = current - updatedNewPrevious;
    // console.log(timeElapsed);

    if (timeElapsed < msPerMinute) {
      return Math.round(timeElapsed / 1000) + " s ago";
    } else if (timeElapsed < msPerHour) {
      return Math.round(timeElapsed / msPerMinute) + " mins ago";
    } else if (timeElapsed < msPerDay) {
      return Math.round(timeElapsed / msPerHour) + " hrs ago";
    } else if (timeElapsed < msPerMonth) {
      return Math.round(timeElapsed / msPerDay) + " days ago";
    } else if (timeElapsed < msPerYear) {
      return Math.round(timeElapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(timeElapsed / msPerYear) + " yrs ago";
    }
  };
  return (
    <article className="job">
      <div className="logo-container">
        <img
          src={company_logo ? company_logo : placeholderLogo}
          alt={company}
          className="job-logo"
        />
      </div>
      <div className="job-text-container">
        <p className="job-time-type">
          {timeSincePosting(new Date().getTime(), { created_at })} - {type}
        </p>

        <h3 className="job-title">{shortenTitle({ title })}</h3>
        <p className="job-company">{company}</p>
        <h4 className="job-location">{location}</h4>

        <button onClick={openModal} className="view-details-btn">
          View Details
        </button>
      </div>

      <section
        className={`${
          isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <section className="modal-container">
          <div className="modal-header">
            <img src={company_logo} alt={company} className="modal-job-logo" />
            <p className="modal-job-time-type">
              {timeSincePosting(new Date().getTime(), { created_at })} - {type}
            </p>

            <h2 className="modal-job-title">{`Position: ${shortenTitle({
              title,
            })}`}</h2>
            <h4 className="modal-job-company">
              <a
                href={company_url}
                rel="noreferrer"
                target="_blank"
              >{`Company: ${company}`}</a>
            </h4>
            <h4 className="modal-job-location">{`Location: ${location}`}</h4>
          </div>
          <div className="markdown">
            <ReactMarkdown source={description} />
          </div>

          <div className="modal-footer">
            <h2>Apply Now</h2>
            <p>{how_to_apply}</p>
          </div>

          <button className="close-modal-btn" onClick={closeModal}>
            <FaTimes></FaTimes>
          </button>
        </section>
      </section>
    </article>
  );
};

export default Job;
