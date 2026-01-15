import React, { useState } from 'react'
import MainNav from '../../components/MainNav'
import ProgressCategoryDropdown from '../../components/Button/ProgressCategoryDropdown'
import { IoMdArrowDropdown } from 'react-icons/io'

export default function PlanningDetail() {
  const [isOverviewOpen, setIsOverviewOpen] = useState(true)
  const [isPurposeOpen, setIsPurposeOpen] = useState(true)

  return (
    <div className="flex flex-col">
      <MainNav />

      <div className="flex items-center justify-between px-10 mt-5">
        <div className="flex items-center">
          <div className="flex bg-[#FFB080] w-10 h-10 rounded-md"></div>
          <div className="flex flex-col ml-4">
            <div className="flex fontBold text-[28px]">Planning</div>
            <div className="flex fontRegular text-[14px]">Project_name</div>
          </div>
        </div>
        <ProgressCategoryDropdown />
      </div>

      <div className="flex flex-col p-8 mx-10 mt-10 bg-white shadow-xl rounded-2xl">
        {/* 서비스 개요 */}
        <div className="flex flex-col">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsOverviewOpen(prev => !prev)}
          >
            <div className="mr-2 text-[#000] text-[20px] fontMedium">
              서비스 개요
            </div>
            <IoMdArrowDropdown
              className={`text-[18px] text-[#cacaca] transition-transform ${
                isOverviewOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {isOverviewOpen && (
            <div className="flex flex-col bg-[#FFE0CD] rounded-2xl mt-2 p-4 mx-3 w-full">
              <div className="text-[16px] fontRegular">프로젝트 이름</div>
              <div className="text-[14px] fontMedium w-full">
                프로젝트 설명
              </div>
            </div>
          )}
        </div>

        {/* 서비스 배경 및 목적 */}
        <div className="flex flex-col mt-10">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsPurposeOpen(prev => !prev)}
          >
            <div className="mr-2 text-[#000] text-[20px] fontMedium">
              서비스 배경 및 목적
            </div>
            <IoMdArrowDropdown
              className={`text-[18px] text-[#cacaca] transition-transform ${
                isPurposeOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {isPurposeOpen && (
            <div className="flex flex-col bg-[#F5FAFF] rounded-2xl mt-2 p-4 mx-3 w-full">
              <div className="text-[16px] fontRegular">프로젝트 이름</div>
              <div className="text-[14px] text-[#ACACAC] fontMedium w-full underline">
                프로젝트 설명
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
