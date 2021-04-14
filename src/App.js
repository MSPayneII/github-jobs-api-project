import React, { useState } from "react";
import "./scss/style.scss";

import useFetchJobs from "./components/useFetchJobs";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Header from "./components/Header";

import Job from "../src/components/Job";
import SearchForm from "./components/SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const { jobs, isLoading, isError } = useFetchJobs(params);

  // console.log(jobs);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;

    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  const themeChange = () => {
    setIsChecked(!isChecked);
    const body = document.querySelector("body");

    if (isChecked) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
    }
  };

  return (
    <div className="background-pattern">
      <Header themeChange={themeChange} isChecked={isChecked} />

      <main>
        <SearchForm params={params} onParamChange={handleParamChange} />

        <div className="job-list ">
          {jobs.map((job) => {
            return <Job key={job.id} {...job} />;
          })}
        </div>

        {isLoading && <Loading />}

        {isError && <Error />}
      </main>
    </div>
  );
}

export default App;
