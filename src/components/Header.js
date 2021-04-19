import React from "react";
import SunIcon from "../dist/assets/desktop/icon-sun.svg";
import MoonIcon from "../dist/assets/desktop/icon-moon.svg";
import Switch from "react-switch";

// This component is for the logo and theme switch at the top of the application

const Header = ({ themeChange, isChecked }) => {
  return (
    <div className="header container">
      <h1 className="logo">devjobs</h1>
      <div className="toggle-switch-container">
        <img src={SunIcon} alt="sun icon" className="sun-icon" />
        <label className="toggle-switch"></label>
        <Switch
          checked={isChecked}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={43}
          handleDiameter={14}
          offHandleColor={"#5964e0"}
          onHandleColor={"#5964e0"}
          offColor={"#fff"}
          onColor={"#fff"}
          onChange={themeChange}
        />
        <img src={MoonIcon} alt="moon icon" className="moon-icon" />
      </div>
    </div>
  );
};

export default Header;
