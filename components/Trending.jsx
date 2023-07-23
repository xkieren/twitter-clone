import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import React from "react";

function Trending() {
  return (
    <div className=" hidden lg:flex flex-col ml-7 mt-4">
      <div className="flex space-x-3 bg-black bg-opacity-10 w-[300px] h-[44px] p-3 rounded-2xl">
        <SearchIcon className="w-6 text-gray-600"></SearchIcon>
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent focus:outline-none placeholder:text-gray-600"
        />
      </div>
      <div className="w-[300px] h-[500px] bg-black bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's happening</h1>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4"></DotsHorizontalIcon>
          <p className="text-xs text-gray-500">Entertainment Trending</p>
          <h1 className="text-[15px] font-bold">Oppenheimer</h1>
          <p className="text-xs text-gray-600">642K Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4"></DotsHorizontalIcon>
          <p className="text-xs text-gray-500">Entertainment Trending</p>
          <h1 className="text-[15px] font-bold">Barbie</h1>
          <p className="text-xs text-gray-600">2.3m tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4"></DotsHorizontalIcon>
          <p className="text-xs text-gray-500">Sports Trending</p>
          <h1 className="text-[15px] font-bold">UFC London</h1>
          <p className="text-xs text-gray-600">57.7k Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4"></DotsHorizontalIcon>
          <p className="text-xs text-gray-500">Sports Trending</p>
          <h1 className="text-[15px] font-bold">#Ashes23</h1>
          <p className="text-xs text-gray-600">26K Tweets</p>
        </div>
        <div className="p-3 relative">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-4"></DotsHorizontalIcon>
          <p className="text-xs text-gray-500">Trending in Australia</p>
          <h1 className="text-[15px] font-bold">Elon</h1>
          <p className="text-xs text-gray-600">156K Tweets</p>
        </div>
      </div>
      <div className="w-[300px] h-[300px] bg-black bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who to follow</h1>

        <div className="flex justify-between p-3 items-center">
          <div className="flex space-x-3">
            <img
              src="/assets/IY9Gx6Ok_400x400.jpg"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="folt-bold">Elon Musk</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400"></BadgeCheckIcon>
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@elonmusk</h1>
            </div>
          </div>
            <button className="bg-black text-white text-sm w-20 h-8 rounded-3xl font-bold">Follow</button>
        </div>
        <div className="flex justify-between p-3 items-center">
          <div className="flex space-x-3">
            <img
              src="/assets/nTGMV1Eo_400x400.jpg"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="folt-bold">Bill Gates</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400"></BadgeCheckIcon>
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@BillGates</h1>
            </div>
          </div>
            <button className="bg-black text-white text-sm w-20 h-8 rounded-3xl font-bold">Follow</button>
        </div>
        <div className="flex justify-between p-3 items-center">
          <div className="flex space-x-3">
            <img
              src="/assets/ETIHb4Nl_400x400.jpg"
              className="w-11 h-11 object-cover rounded-full"
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="folt-bold">Jeff Bezos</h1>
                <BadgeCheckIcon className="w-[18px] text-blue-400"></BadgeCheckIcon>
              </div>
              <h1 className="text-[12px] mt-1 text-gray-500">@JeffBezos</h1>
            </div>
          </div>
            <button className="bg-black text-white text-sm w-20 h-8 rounded-3xl font-bold">Follow</button>
        </div>

      </div>
    </div>
  );
}

export default Trending;
