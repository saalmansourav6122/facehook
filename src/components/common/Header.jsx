import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../Hooks/useProfile";

// Assets
import logo from "../../assets/images/logo.svg";
import homeIcon from "../../assets/icons/home.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import avatarImg from "../../assets/images/avatars/avatar_1.png";
import LogOut from "./../auth/LogOut";

import { useAuth } from "../../Hooks/useAuth";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Logo */}
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={logo}
            alt="Logo"
          />
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={homeIcon} alt="Home" />
            Home
          </Link>
          <button type="button" className="icon-btn">
            <img src={notificationIcon} alt="Notification" />
          </button>
          <LogOut />

          <Link to="/me" className="flex-center ml-8 gap-3">
            <span className="text-lg font-medium lg:text-xl">
              {user?.firstName} {""} {user?.lastName}
            </span>
            <img
              className="max-h-[32px] max-w-[32px] rounded-full lg:max-h-[44px] lg:max-w-[44px] rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
              alt="User avatar"
            />
          </Link>
        </div>
        {/* Nav Links Ends */}
      </div>
    </nav>
  );
}
