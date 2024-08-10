import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFileText,
  FiHeart,
  FiSettings,
} from "react-icons/fi";

const Nav = () => {
  return (
    <nav className="space-y-1 flex">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2 px-3 font-medium ml-1 rounded-lg ${
            isActive ? "bg-[#D4E9FF] text-black" : "text-white hover:text-black hover:bg-[#D4E9FF]"
          }`
        }
      >
        <FiGrid />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2 px-3 font-medium ml-1 rounded-lg ${
            isActive ? "bg-[#D4E9FF] text-black" : "text-white hover:text-black hover:bg-[#D4E9FF]"
          }`
        }
      >
        <FiFileText />
        <span>About</span>
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2 px-3 font-medium ml-1 rounded-lg ${
            isActive ? "bg-[#D4E9FF] text-black" : "text-white hover:text-black hover:bg-[#D4E9FF]"
          }`
        }
      >
        <FiHeart />
        <span>Contact</span>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2 px-3 font-medium ml-1 rounded-lg ${
            isActive ? "bg-[#D4E9FF] text-black" : "text-white hover:text-black hover:bg-[#D4E9FF]"
          }`
        }
      >
        <FiSettings />
        <span>Dashboard</span>
      </NavLink>
    </nav>
  );
};

export default Nav;
