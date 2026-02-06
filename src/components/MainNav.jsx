import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name;

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="flex items-center justify-between w-full px-5 py-2">
      <div
        className="fontMedium w-fit text-[26px] mr-[2%] cursor-pointer"
        onClick={() => navigate("/")}
      >
        DevGuidely
      </div>

      <div className="flex items-center justify-end mx-4 mt-1">
        {isLoggedIn && (
          <div className="flex items-center justify-end w-full px-1 py-2">
            <span className="fontRegular w-full text-[14px] mr-[7%] whitespace-nowrap">
              {name}님
            </span>

            <div
              className="text-[14px] fontRegular cursor-pointer pl-[7%] border-l-[1px] border-[#333] bg-transparent"
              onClick={handleLogout}
            >
              logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
