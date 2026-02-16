import React from "react";
import logo from "../shared/assets/images/logo.svg";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <div className=" flex gap-2">
        <img src={logo} alt="" />
        <span className="font-bold text-[18px]">TaskFlow</span>
      </div>
    </header>
  );
};

export default Header;
