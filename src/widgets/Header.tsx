import React from "react";
import logo from "../shared/assets/images/logo.svg";
import { Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <div className=" flex gap-2">
        <img src={logo} alt="" />
        <span className="font-bold text-[18px]">TaskFlow</span>
        <Search />
        <Button variant={"outline"}>Add Task</Button>
      </div>
    </header>
  );
};

export default Header;
