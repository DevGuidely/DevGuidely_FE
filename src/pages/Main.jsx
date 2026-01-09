import React from 'react'
import TopNav from '../components/TopNav';
import { useNavigate } from 'react-router-dom';
import { IoArrowForwardOutline } from "react-icons/io5";
import ProjectList from './Project/ProjectList';

export default function Main() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  function handleLogout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/");
  }

  function handleStartClick() {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/projectList");
  }

  return (
    <div className='bg-gradient-soft'>
      <div className='bg-gradient-content'>
        {isLoggedIn ? (
          <div className="flex justify-end items-center px-[0.5%] py-[0.3%]">
              <span className="fontRegular text-[14px] mr-[1%]">환영합니다</span>
              <div
                  className="text-[14px] fontRegular cursor-pointer pl-[1%] border-l-[1px] border-[#333]"
                  type="button"
                  onClick={handleLogout}
              >
                  logout
              </div>
          </div>
          ) : (
          <TopNav />
        )}
        <div className='flex flex-col min-h-screen bg-transparent justify-center ml-[5%]'>
          <div className='fontEB text-[80px]'>DevGuidely</div>
          <div className='flex fontRegular text-[20px]'>설명~</div>

          <button
            onClick={handleStartClick}
            className="flex bg-transparent items-center border-none w-full items-center mt-[17%] cursor-pointer"
          >
            <div className="fontRegular text-[25px]">Start</div>
            <IoArrowForwardOutline className="ml-[1%] text-[20px]" />
          </button>
        </div>
      </div>
    </div>
  )
}
