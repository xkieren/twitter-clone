import React from "react";
import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  BadgeCheckIcon,
  UsersIcon
} from "@heroicons/react/outline";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import { auth } from "@/firebase";
import { closeLoginModal, closeSignUpModal } from "@/redux/modalSlice";
import Link from "next/link";

function Sidebar() {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  console.log(user)

  async function handleSignOut() {
    await signOut(auth)
    dispatch(signOutUser())
    dispatch(closeSignUpModal())
    dispatch(closeLoginModal())

  }

  return (
    <div className="h-full hidden sm:flex flex-col fixed xlg:ml-36 ">
      <nav className="h-full relative xl:space-y-1.5 ">
        <Link href={"/"}>
      <div className="flex justify-center items-center xl:justify-start py-3 xl:p-5">
          <Image
            src={"/assets/2021 Twitter logo - blue.png"}
            width={34}
            height={34}
            ></Image>
        </div>
            </Link>
        <Link href={"/"}>
        <SidebarLink Icon={HomeIcon} text={"Home"}></SidebarLink>
        </Link>
        <SidebarLink Icon={HashtagIcon} text={"Explore"}></SidebarLink>
        <SidebarLink Icon={BellIcon} text={"Notifications"}></SidebarLink>
        <SidebarLink Icon={InboxIcon} text={"Messages"}></SidebarLink>
        <SidebarLink Icon={ClipboardIcon} text={"Lists"}></SidebarLink>
        <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"}></SidebarLink>
        <SidebarLink Icon={UsersIcon} text={"Communities"}></SidebarLink>
        <SidebarLink Icon={BadgeCheckIcon} text={"Verified"}></SidebarLink>
        <SidebarLink Icon={UserIcon} text={"Profile"}></SidebarLink>
        <SidebarLink
          Icon={DotsCircleHorizontalIcon}
          text={"More"}
        ></SidebarLink>
        <button className="hidden xl:inline bg-[#1d9bf0] rounded-full h-[52px] mt-2 w-[200px] text-lg font-bold text-white">
          Tweet
        </button>
        <div
          className="
          hover:bg-black hover:bg-opacity-10 rounded-full cursor-pointer
          absolute cl:p-3 bottom-0 flex justify-center items-center space-x-3"
          onClick={handleSignOut}
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoUrl}
            alt=""
          />
          <div className="hidden xl:inline">
            <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
            <h1 className="text-gray-500">@{user.username}</h1>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline"></DotsHorizontalIcon>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;

function SidebarLink({ text, Icon }) {
  return (
    <li className="hoverAnimation flex mb-5 xl:justify-start justify-center items-center text-xl space-x-3">
      <Icon className="h-8"></Icon>
      <span className="hidden xl:inline"> {text}</span>
    </li>
  );
}
